<script setup lang="ts">
// Central column: header bar + canvas, stacked, filling the full column
// height. The canvas is empty by design — fill it via the default slot.
import GlassPanel from "../common/GlassPanel.vue";
import ContentHeader from "../header/ContentHeader.vue";
</script>

<template>
  <main class="main-content">
    <ContentHeader />
    <GlassPanel tag="section" class="content-canvas">
      <slot />
    </GlassPanel>
  </main>
</template>
