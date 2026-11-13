package main

import (
	"errors"
	"os"
	"path/filepath"
	"testing"
)

func newTestThemeService(t *testing.T, opts ...ThemeOption) (*ThemeService, string) {
	t.Helper()
	path := filepath.Join(t.TempDir(), "nested", settingsFileName)
	s, err := NewThemeService(append([]ThemeOption{WithSettingsPath(path)}, opts...)...)
	if err != nil {
		t.Fatalf("NewThemeService: %v", err)
	}
	return s, path
}

func TestThemeDefaultsWhenNothingSaved(t *testing.T) {
	s, _ := newTestThemeService(t, WithDefaultTheme("paper"))

	got, err := s.Theme()
	if err != nil {
		t.Fatalf("Theme: %v", err)
	}
	if got != "paper" {
		t.Fatalf("Theme = %q, want %q", got, "paper")
	}
}

func TestSetThemeRoundTrip(t *testing.T) {
	s, path := newTestThemeService(t)

	if err := s.SetTheme("rose-noir"); err != nil {
		t.Fatalf("SetTheme: %v", err)
	}
	got, err := s.Theme()
	if err != nil {
		t.Fatalf("Theme: %v", err)
	}
	if got != "rose-noir" {
		t.Fatalf("Theme = %q, want %q", got, "rose-noir")
	}

	// A fresh service on the same file sees the saved value.
	again, err := NewThemeService(WithSettingsPath(path))
	if err != nil {
		t.Fatalf("NewThemeService: %v", err)
	}
	if got, _ := again.Theme(); got != "rose-noir" {
		t.Fatalf("reloaded Theme = %q, want %q", got, "rose-noir")
	}
}

func TestSetThemeRejectsInvalidIDs(t *testing.T) {
	s, path := newTestThemeService(t)

	for _, id := range []string{"", "Upper", "has space", "-lead", "trail-", "a--b", "../etc", "x123456789012345678901234567890123"} {
		if err := s.SetTheme(id); !errors.Is(err, ErrInvalidThemeID) {
			t.Errorf("SetTheme(%q) error = %v, want ErrInvalidThemeID", id, err)
		}
	}
	if _, err := os.Stat(path); !errors.Is(err, os.ErrNotExist) {
		t.Fatalf("settings file written for invalid IDs (stat err = %v)", err)
	}
}

func TestThemeReportsCorruptFileAndKeepsIt(t *testing.T) {
	s, path := newTestThemeService(t)
	if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(path, []byte("{not json"), 0o644); err != nil {
		t.Fatal(err)
	}

	got, err := s.Theme()
	if err == nil {
		t.Fatal("Theme: want error for corrupt settings file")
	}
	if got != defaultThemeID {
		t.Fatalf("Theme = %q, want default %q", got, defaultThemeID)
	}
	if err := s.SetTheme("paper"); err == nil {
		t.Fatal("SetTheme: want error instead of overwriting corrupt file")
	}
}

func TestThemeIgnoresInvalidSavedID(t *testing.T) {
	s, path := newTestThemeService(t)
	if err := os.MkdirAll(filepath.Dir(path), 0o755); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(path, []byte(`{"theme":"NOT VALID"}`), 0o644); err != nil {
		t.Fatal(err)
	}

	got, err := s.Theme()
	if err != nil {
		t.Fatalf("Theme: %v", err)
	}
	if got != defaultThemeID {
		t.Fatalf("Theme = %q, want default %q", got, defaultThemeID)
	}
}

func TestNewThemeServiceRejectsBadOptions(t *testing.T) {
	if _, err := NewThemeService(WithSettingsPath("")); err == nil {
		t.Error("WithSettingsPath(\"\"): want error")
	}
	if _, err := NewThemeService(WithDefaultTheme("Bad ID")); !errors.Is(err, ErrInvalidThemeID) {
		t.Errorf("WithDefaultTheme: error = %v, want ErrInvalidThemeID", err)
	}
}
