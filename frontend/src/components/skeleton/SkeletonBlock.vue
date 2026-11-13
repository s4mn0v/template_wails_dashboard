<script setup lang="ts">
// Skeleton primitive: a static placeholder shape. Size it with
// `width`/`height` (any CSS length); `shape` picks the corner style.
// Purely decorative — the container that groups skeletons should carry
// aria-busy / a loading label (see the examples in ./examples).
withDefaults(
  defineProps<{
    width?: string;
    height?: string;
    shape?: "rect" | "pill" | "circle";
  }>(),
  {
    width: "100%",
    height: "0.75rem",
    shape: "rect",
  },
);
</script>

<template>
  <span
    class="skeleton"
    :class="`skeleton--${shape}`"
    :style="{ width, height: shape === 'circle' ? width : height }"
    aria-hidden="true"
  />
</template>
