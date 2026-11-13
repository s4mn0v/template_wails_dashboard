<script setup lang="ts">
// Central column: header bar + canvas, stacked, filling the full column
// height. Both are empty by design — fill the header via the #header slot
// and the canvas via the default slot.
import GlassPanel from "../common/GlassPanel.vue";
import ContentHeader from "../header/ContentHeader.vue";
</script>

<template>
  <main class="main-content">
    <ContentHeader>
      <slot name="header" />
    </ContentHeader>
    <GlassPanel tag="section" class="content-canvas">
      <slot />
    </GlassPanel>
  </main>
</template>
