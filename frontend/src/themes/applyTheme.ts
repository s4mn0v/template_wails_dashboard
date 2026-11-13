// Writes a theme's palette onto <html> as CSS custom properties. Every key
// becomes two tokens: `--color-<name>` (hex, for plain use) and
// `--c-<name>` ("r, g, b", for rgba(var(--c-name), <alpha>) compositing).
import type { Palette, Theme } from "./catalog";

const TOKEN_NAMES: Record<keyof Palette, string> = {
  lowest: "surface-container-lowest",
  low: "surface-container-low",
  surface: "surface",
  container: "surface-container",
  high: "surface-container-high",
  variant: "surface-variant",
  outline: "outline",
  outlineVariant: "outline-variant",
  onSurface: "on-surface",
  onSurfaceVariant: "on-surface-variant",
  primary: "primary",
  accent: "accent",
  shadow: "shadow",
};

function hexToTriplet(hex: string): string {
  const n = Number.parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  for (const key of Object.keys(TOKEN_NAMES) as (keyof Palette)[]) {
    const hex = theme.palette[key];
    root.style.setProperty(`--color-${TOKEN_NAMES[key]}`, hex);
    root.style.setProperty(`--c-${TOKEN_NAMES[key]}`, hexToTriplet(hex));
  }
  // Light themes need much softer shadows to not look smudged.
  root.style.setProperty("--shadow-strength", theme.mode === "light" ? "0.35" : "1");
  root.style.colorScheme = theme.mode;
  root.dataset.theme = theme.id;
  root.dataset.themeMode = theme.mode;
}
