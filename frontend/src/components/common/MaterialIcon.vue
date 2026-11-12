<script setup lang="ts">
// Thin wrapper around a Material Symbols ligature glyph. The icon "name" is
// both the prop value and the text rendered — the font turns the word itself
// into the glyph. Base look (display/line-height) lives in base.css.
withDefaults(
  defineProps<{
    name: string;
    size?: number;
  }>(),
  {
    size: 18,
  },
);
</script>

<template>
  <span class="material-symbols-outlined" :style="{ fontSize: `${size}px` }">{{ name }}</span>
</template>
