<script setup lang="ts">
// Generic icon renderer. `icon` is a component — any of the inline-SVG
// components unplugin-icons compiles from `~icons/<collection>/<name>`
// (see vite.config.ts). Swap the collection per import to mix icon sets;
// nothing here is tied to Material Symbols specifically.
import type { Component } from "vue";

withDefaults(
  defineProps<{
    icon: Component;
    size?: number;
  }>(),
  {
    size: 18,
  },
);
</script>

<template>
  <component :is="icon" :width="size" :height="size" />
</template>
