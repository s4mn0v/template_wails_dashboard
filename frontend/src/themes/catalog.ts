// Theme catalog — the single source of truth for every palette. Each entry
// maps onto the design tokens in assets/css/tokens.css (applyTheme.ts writes
// them onto <html>). To add a theme, append an entry here; nothing else needs
// to change. IDs are kebab-case (the Go ThemeService validates that shape).

export type ThemeMode = "dark" | "light";

export interface Palette {
  /** Window backdrop (darkest in dark themes, page tone in light ones). */
  lowest: string;
  /** Glass panel fill. */
  low: string;
  surface: string;
  container: string;
  high: string;
  variant: string;
  outline: string;
  outlineVariant: string;
  onSurface: string;
  onSurfaceVariant: string;
  /** Strong foreground: hover/active icon color. */
  primary: string;
  /** Brand/accent color: selection marks, scrollbar hover, focus rings. */
  accent: string;
  /** Drop-shadow color. */
  shadow: string;
}

export interface Theme {
  id: string;
  name: string;
  mode: ThemeMode;
  palette: Palette;
}

export const DEFAULT_THEME_ID = "synthesis";

export const themes: readonly Theme[] = [
  // ----- Dark -----
  {
    id: "synthesis",
    name: "Synthesis",
    mode: "dark",
    palette: {
      lowest: "#0e0e10", low: "#1c1b1d", surface: "#131315", container: "#201f22",
      high: "#2a2a2c", variant: "#353437", outline: "#8e9193", outlineVariant: "#444749",
      onSurface: "#e5e1e4", onSurfaceVariant: "#c4c7c9", primary: "#ffffff",
      accent: "#a8c7fa", shadow: "#0e0e10",
    },
  },
  {
    id: "midnight",
    name: "Midnight",
    mode: "dark",
    palette: {
      lowest: "#0a0f1c", low: "#121a2b", surface: "#0e1524", container: "#172036",
      high: "#1e2942", variant: "#28344f", outline: "#7f8db0", outlineVariant: "#36435f",
      onSurface: "#dfe6f5", onSurfaceVariant: "#a9b6d3", primary: "#ffffff",
      accent: "#5ccfe6", shadow: "#03060d",
    },
  },
  {
    id: "carbon",
    name: "Carbon",
    mode: "dark",
    palette: {
      lowest: "#1f2023", low: "#2b2d31", surface: "#25272a", container: "#323438",
      high: "#3a3c41", variant: "#45474c", outline: "#8d9096", outlineVariant: "#55585e",
      onSurface: "#e4e4e1", onSurfaceVariant: "#a7a9ad", primary: "#f5c542",
      accent: "#f5c542", shadow: "#111214",
    },
  },
  {
    id: "ember",
    name: "Ember",
    mode: "dark",
    palette: {
      lowest: "#17110e", low: "#231a15", surface: "#1c1511", container: "#2b201a",
      high: "#352820", variant: "#43332a", outline: "#9b8577", outlineVariant: "#54423a",
      onSurface: "#f1e3d8", onSurfaceVariant: "#cdb7a7", primary: "#ffb070",
      accent: "#ff8a3d", shadow: "#0a0705",
    },
  },
  {
    id: "forest",
    name: "Forest",
    mode: "dark",
    palette: {
      lowest: "#0d1411", low: "#16211b", surface: "#111a15", container: "#1c2a22",
      high: "#23342a", variant: "#2d4135", outline: "#7f9a8a", outlineVariant: "#3a5043",
      onSurface: "#dcebe1", onSurfaceVariant: "#a8c2b2", primary: "#b9f6ca",
      accent: "#6ee7a8", shadow: "#050907",
    },
  },
  {
    id: "amethyst",
    name: "Amethyst",
    mode: "dark",
    palette: {
      lowest: "#130f1c", low: "#1e182b", surface: "#181323", container: "#262035",
      high: "#2f2741", variant: "#3b3150", outline: "#958ab0", outlineVariant: "#4a3f61",
      onSurface: "#ebe3f7", onSurfaceVariant: "#c3b7d9", primary: "#e3c9ff",
      accent: "#b388ff", shadow: "#07050c",
    },
  },
  {
    id: "rose-noir",
    name: "Rose Noir",
    mode: "dark",
    palette: {
      lowest: "#140e11", low: "#21171b", surface: "#1a1216", container: "#2a1e23",
      high: "#34252b", variant: "#423038", outline: "#a08890", outlineVariant: "#543e47",
      onSurface: "#f4e2e8", onSurfaceVariant: "#d3b5bf", primary: "#ffc2d4",
      accent: "#ff6f9c", shadow: "#090507",
    },
  },
  {
    id: "oceanic",
    name: "Oceanic",
    mode: "dark",
    palette: {
      lowest: "#0b1719", low: "#132427", surface: "#0f1d20", container: "#1a2e32",
      high: "#21393d", variant: "#2b474c", outline: "#7ea2a6", outlineVariant: "#38575c",
      onSurface: "#d9eef0", onSurfaceVariant: "#a3c4c7", primary: "#9ff2e8",
      accent: "#2dd4bf", shadow: "#040a0b",
    },
  },

  // ----- Light -----
  {
    id: "paper",
    name: "Paper",
    mode: "light",
    palette: {
      lowest: "#ebe6dc", low: "#f7f3ec", surface: "#f1ece3", container: "#ece6db",
      high: "#e4ddd0", variant: "#dbd3c4", outline: "#857c6f", outlineVariant: "#cbc2b2",
      onSurface: "#2b2620", onSurfaceVariant: "#5c5449", primary: "#1c1813",
      accent: "#b5562e", shadow: "#6b5d48",
    },
  },
  {
    id: "frost",
    name: "Frost",
    mode: "light",
    palette: {
      lowest: "#dde4ee", low: "#f3f6fa", surface: "#e9eef5", container: "#e3e9f2",
      high: "#d8e0eb", variant: "#ccd6e3", outline: "#717d8f", outlineVariant: "#bcc7d6",
      onSurface: "#1b2330", onSurfaceVariant: "#4a5568", primary: "#0f1724",
      accent: "#2f6fde", shadow: "#475a78",
    },
  },
  {
    id: "sakura",
    name: "Sakura",
    mode: "light",
    palette: {
      lowest: "#f2dfe4", low: "#fdf4f6", surface: "#f9ebef", container: "#f5e3e8",
      high: "#efd6dd", variant: "#e6c7d0", outline: "#8f6f79", outlineVariant: "#dbb8c2",
      onSurface: "#3a2229", onSurfaceVariant: "#6b4a54", primary: "#2d151c",
      accent: "#d6336c", shadow: "#8a4f60",
    },
  },
  {
    id: "sand",
    name: "Sand",
    mode: "light",
    palette: {
      lowest: "#e8dcc6", low: "#f8f1e4", surface: "#f2e8d6", container: "#ede1cb",
      high: "#e5d6bc", variant: "#dbcaab", outline: "#8a7a5e", outlineVariant: "#cfbd9b",
      onSurface: "#33291a", onSurfaceVariant: "#64563e", primary: "#241c10",
      accent: "#c2672a", shadow: "#7a6440",
    },
  },
  {
    id: "mint",
    name: "Mint",
    mode: "light",
    palette: {
      lowest: "#d7e8de", low: "#f1f8f3", surface: "#e5f1e9", container: "#ddece2",
      high: "#d0e3d7", variant: "#c2d9ca", outline: "#6c8476", outlineVariant: "#b1cbbb",
      onSurface: "#18291f", onSurfaceVariant: "#43594b", primary: "#0d1c13",
      accent: "#1f9d63", shadow: "#3f6650",
    },
  },
];

const byId = new Map(themes.map((t) => [t.id, t]));

/** Resolves an ID to a theme, falling back to the default for unknown IDs. */
export function findTheme(id: string | null | undefined): Theme {
  return (id && byId.get(id)) || byId.get(DEFAULT_THEME_ID)!;
}
