package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"regexp"
	"sync"
)

// The palette catalog lives in the frontend (frontend/src/themes/catalog.ts);
// the backend only persists which theme the user picked. So it validates the
// *shape* of an ID at the boundary, not membership — an ID the frontend no
// longer knows simply falls back to its default there.
var themeIDPattern = regexp.MustCompile(`^[a-z0-9]+(-[a-z0-9]+)*$`)

const (
	maxThemeIDLen    = 32
	defaultThemeID   = "synthesis"
	settingsFileName = "settings.json"
)

// ErrInvalidThemeID is returned when a theme ID is empty, too long or not
// kebab-case.
var ErrInvalidThemeID = errors.New("invalid theme id")

func validateThemeID(id string) error {
	if len(id) == 0 || len(id) > maxThemeIDLen || !themeIDPattern.MatchString(id) {
		return fmt.Errorf("%w: %q", ErrInvalidThemeID, id)
	}
	return nil
}

// settings is the on-disk shape of the settings file. Kept as a struct (not a
// bare string) so other preferences can be added without a format change.
type settings struct {
	Theme string `json:"theme"`
}

// ThemeService persists the selected UI theme. Its exported methods are bound
// to the frontend by Wails.
type ThemeService struct {
	mu           sync.Mutex // serializes read-modify-write of the settings file
	path         string
	defaultTheme string
}

// ThemeOption configures a ThemeService.
type ThemeOption func(*ThemeService) error

// WithSettingsPath overrides where settings are stored (default:
// <user config dir>/<appName>/settings.json). Mainly useful for tests.
func WithSettingsPath(path string) ThemeOption {
	return func(s *ThemeService) error {
		if path == "" {
			return errors.New("theme: settings path must not be empty")
		}
		s.path = path
		return nil
	}
}

// WithDefaultTheme sets the theme returned when nothing has been saved yet.
func WithDefaultTheme(id string) ThemeOption {
	return func(s *ThemeService) error {
		if err := validateThemeID(id); err != nil {
			return fmt.Errorf("theme: default: %w", err)
		}
		s.defaultTheme = id
		return nil
	}
}

// NewThemeService builds a ThemeService. It does not touch the disk; the
// settings file is created lazily on the first SetTheme.
func NewThemeService(opts ...ThemeOption) (*ThemeService, error) {
	s := &ThemeService{defaultTheme: defaultThemeID}
	for _, opt := range opts {
		if err := opt(s); err != nil {
			return nil, err
		}
	}
	if s.path != "" {
		return s, nil
	}

	dir, err := os.UserConfigDir()
	if err != nil {
		return nil, fmt.Errorf("theme: locate user config dir: %w", err)
	}
	s.path = filepath.Join(dir, appName, settingsFileName)
	return s, nil
}

// Theme returns the saved theme ID, or the default one when nothing valid has
// been saved yet. A settings file that exists but cannot be read is reported
// as an error rather than silently replaced.
func (s *ThemeService) Theme() (string, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	st, err := s.load()
	if err != nil {
		return s.defaultTheme, err
	}
	if validateThemeID(st.Theme) != nil {
		return s.defaultTheme, nil
	}
	return st.Theme, nil
}

// SetTheme validates and persists the selected theme ID.
func (s *ThemeService) SetTheme(id string) error {
	if err := validateThemeID(id); err != nil {
		return err
	}

	s.mu.Lock()
	defer s.mu.Unlock()

	st, err := s.load()
	if err != nil {
		// Don't overwrite a file we couldn't parse — it may hold other settings.
		return err
	}
	st.Theme = id
	return s.save(st)
}

// load reads the settings file. A missing file is not an error: it just means
// nothing has been saved yet. Callers must hold s.mu.
func (s *ThemeService) load() (settings, error) {
	var st settings

	data, err := os.ReadFile(s.path)
	if errors.Is(err, fs.ErrNotExist) {
		return st, nil
	}
	if err != nil {
		return st, fmt.Errorf("theme: read settings: %w", err)
	}
	if err := json.Unmarshal(data, &st); err != nil {
		return st, fmt.Errorf("theme: parse settings %s: %w", s.path, err)
	}
	return st, nil
}

// save writes the settings file atomically (temp file + rename), so a crash
// mid-write never leaves a truncated file behind. Callers must hold s.mu.
func (s *ThemeService) save(st settings) error {
	data, err := json.MarshalIndent(st, "", "  ")
	if err != nil {
		return fmt.Errorf("theme: encode settings: %w", err)
	}

	dir := filepath.Dir(s.path)
	if err := os.MkdirAll(dir, 0o755); err != nil {
		return fmt.Errorf("theme: create settings dir: %w", err)
	}

	tmp, err := os.CreateTemp(dir, settingsFileName+".*.tmp")
	if err != nil {
		return fmt.Errorf("theme: create temp settings: %w", err)
	}
	// No-op once the rename succeeds; cleans up on any earlier failure.
	defer os.Remove(tmp.Name())

	if _, err := tmp.Write(data); err != nil {
		tmp.Close()
		return fmt.Errorf("theme: write settings: %w", err)
	}
	// Close errors matter here: they can be the only report of a failed write.
	if err := tmp.Close(); err != nil {
		return fmt.Errorf("theme: write settings: %w", err)
	}
	if err := os.Rename(tmp.Name(), s.path); err != nil {
		return fmt.Errorf("theme: replace settings: %w", err)
	}
	return nil
}
