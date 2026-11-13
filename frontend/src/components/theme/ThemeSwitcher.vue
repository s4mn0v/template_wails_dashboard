<script setup lang="ts">
// Floating theme picker pinned to the bottom-right corner. An icon-only
// button (the active theme's name slides out on hover/focus) opens a
// scrollable menu (grouped dark/light) where every entry previews its own
// palette as a small swatch. Choosing one triggers a circular reveal that
// grows out of the button; the menu stays open so themes can be compared,
// and closes on an outside click (or Escape / the button again).
import { nextTick, onBeforeUnmount, ref, watch } from "vue";
import AppIcon from "../common/AppIcon.vue";
import GlassPanel from "../common/GlassPanel.vue";
import IconPalette from "~icons/material-symbols/palette-outline";
import IconCheck from "~icons/material-symbols/check-rounded";
import { useTheme } from "../../themes/useTheme";
import type { Theme, ThemeMode } from "../../themes/catalog";

const { themes, current, setTheme } = useTheme();

const GROUP_LABELS: Record<ThemeMode, string> = { dark: "Dark", light: "Light" };
const groups = (Object.keys(GROUP_LABELS) as ThemeMode[]).map((mode) => ({
  mode,
  label: GROUP_LABELS[mode],
  items: themes.filter((t) => t.mode === mode),
}));

const open = ref(false);
const root = ref<HTMLElement | null>(null);
const trigger = ref<HTMLButtonElement | null>(null);
const list = ref<HTMLElement | null>(null);

function options(): HTMLButtonElement[] {
  return Array.from(list.value?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]') ?? []);
}

async function openMenu(): Promise<void> {
  open.value = true;
  await nextTick();
  const active = list.value?.querySelector<HTMLElement>('[aria-checked="true"]') ?? options()[0];
  active?.scrollIntoView({ block: "nearest" });
  active?.focus({ preventScroll: true });
}

function closeMenu(returnFocus = true): void {
  open.value = false;
  if (returnFocus) trigger.value?.focus();
}

function toggle(): void {
  if (open.value) closeMenu();
  else void openMenu();
}

function triggerCenter() {
  const r = trigger.value!.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

function choose(theme: Theme): Promise<void> {
  return setTheme(theme, triggerCenter());
}

function onMenuKeydown(e: KeyboardEvent): void {
  const items = options();
  const i = items.indexOf(document.activeElement as HTMLButtonElement);
  const focusAt = (n: number) => items[(n + items.length) % items.length]?.focus();

  switch (e.key) {
    case "ArrowDown":
      focusAt(i + 1);
      break;
    case "ArrowUp":
      focusAt(i < 0 ? -1 : i - 1);
      break;
    case "Home":
      focusAt(0);
      break;
    case "End":
      focusAt(-1);
      break;
    case "Escape":
      closeMenu();
      break;
    case "Tab":
      closeMenu(false);
      return; // let focus move on naturally
    default:
      return;
  }
  e.preventDefault();
}

function onDocumentPointerDown(e: PointerEvent): void {
  if (!root.value?.contains(e.target as Node)) closeMenu(false);
}

// Only listen for outside clicks while the menu is actually open.
watch(open, (isOpen) => {
  if (isOpen) document.addEventListener("pointerdown", onDocumentPointerDown);
  else document.removeEventListener("pointerdown", onDocumentPointerDown);
});

onBeforeUnmount(() => document.removeEventListener("pointerdown", onDocumentPointerDown));
</script>

<template>
  <div ref="root" class="theme-switcher">
    <Transition name="theme-menu">
      <GlassPanel
        v-if="open"
        id="theme-menu"
        shadow="lg"
        class="theme-switcher__menu"
        role="menu"
        aria-label="Themes"
        @keydown="onMenuKeydown"
      >
        <div ref="list" class="theme-switcher__list">
          <div v-for="group in groups" :key="group.mode" role="group" :aria-label="group.label">
            <div class="theme-switcher__heading" aria-hidden="true">{{ group.label }}</div>
            <button
              v-for="theme in group.items"
              :key="theme.id"
              type="button"
              role="menuitemradio"
              tabindex="-1"
              class="theme-option"
              :aria-checked="theme.id === current.id"
              @click="choose(theme)"
            >
              <span class="theme-option__check">
                <AppIcon v-if="theme.id === current.id" :icon="IconCheck" :size="14" />
              </span>
              <span class="theme-option__name">{{ theme.name }}</span>
              <span
                class="theme-option__swatch"
                aria-hidden="true"
                :style="{ backgroundColor: theme.palette.low, borderColor: theme.palette.outlineVariant }"
              >
                <span :style="{ backgroundColor: theme.palette.accent }" />
                <span :style="{ backgroundColor: theme.palette.primary }" />
                <span :style="{ backgroundColor: theme.palette.onSurfaceVariant }" />
              </span>
            </button>
          </div>
        </div>
      </GlassPanel>
    </Transition>

    <!-- Plain <button> with the glass surface class (not GlassPanel) so the
         ref is the element itself — its rect is the reveal's origin. -->
    <button
      ref="trigger"
      type="button"
      class="theme-switcher__trigger panel panel--sm-shadow"
      aria-haspopup="menu"
      aria-controls="theme-menu"
      :aria-expanded="open"
      :aria-label="`Theme: ${current.name}`"
      @click="toggle"
    >
      <AppIcon :icon="IconPalette" :size="16" />
      <span class="theme-switcher__label" aria-hidden="true">{{ current.name }}</span>
    </button>
  </div>
</template>
