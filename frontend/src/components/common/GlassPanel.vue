<script setup lang="ts">
// Shared "floating glass" shell: the frosted, bordered surface used by both
// sidebars, the content header and the central canvas. Layout/size/padding
// classes are passed in by the caller and merge onto the root element
// automatically via Vue's attrs fallthrough — this component only owns the
// visual surface (see assets/css/panel.css).
withDefaults(
  defineProps<{
    tag?: string;
    shadow?: "xl" | "lg";
  }>(),
  {
    tag: "div",
    shadow: "xl",
  },
);
</script>

<template>
  <component :is="tag" class="panel" :class="{ 'panel--sm-shadow': shadow === 'lg' }">
    <slot />
  </component>
</template>
