// App-wide theme state. The Go ThemeService is the source of truth (webview
// storage isn't guaranteed to survive restarts); localStorage is only a
// synchronous cache so the right palette is painted before the backend call
// resolves.
import { readonly, ref } from "vue";
import { ThemeService } from "../../bindings/changeme";
import { applyTheme } from "./applyTheme";
import { findTheme, themes, type Theme } from "./catalog";
import { circularReveal, type Point } from "./circularReveal";

const CACHE_KEY = "theme";

function readCache(): string | null {
  try {
    return localStorage.getItem(CACHE_KEY);
  } catch {
    return null;
  }
}

function writeCache(id: string): void {
  try {
    localStorage.setItem(CACHE_KEY, id);
  } catch {
    // Storage blocked — the backend still has it.
  }
}

const current = ref<Theme>(findTheme(readCache()));

function commit(theme: Theme): void {
  applyTheme(theme);
  current.value = theme;
  writeCache(theme.id);
}

/**
 * Applies the cached theme immediately, then reconciles with the backend.
 * Call once, before mounting the app.
 */
export function initTheme(): void {
  applyTheme(current.value);
  ThemeService.Theme()
    .then((id) => {
      const saved = findTheme(id);
      if (saved.id !== current.value.id) commit(saved);
    })
    .catch((err) => console.warn("theme: could not load saved theme:", err));
}

/** Switches theme with a circular reveal growing from `origin`. */
async function setTheme(theme: Theme, origin: Point): Promise<void> {
  if (theme.id === current.value.id) return;
  await circularReveal(origin, () => commit(theme), theme.palette.lowest);
  ThemeService.SetTheme(theme.id).catch((err) => console.error("theme: could not save theme:", err));
}

export function useTheme() {
  return { themes, current: readonly(current), setTheme };
}
