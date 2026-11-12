<script setup lang="ts">
// Thin bar above the canvas. Empty by design — fill it via the default slot.
import GlassPanel from "../common/GlassPanel.vue";
</script>

<template>
  <GlassPanel tag="header" shadow="lg" class="content-header">
    <slot />
  </GlassPanel>
</template>
