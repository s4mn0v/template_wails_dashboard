<script setup lang="ts">
// Left floating sidebar. Empty by design — fill it via the default slot.
// Carries its own collapse toggle, so it stays self-contained regardless of
// how narrow the window gets.
import { ref } from "vue";
import GlassPanel from "../common/GlassPanel.vue";
import IconButton from "../common/IconButton.vue";

const collapsed = ref(false);
</script>

<template>
  <GlassPanel tag="aside" class="sidebar sidebar--left" :class="{ 'is-collapsed': collapsed }">
    <IconButton
      class="sidebar__toggle"
      :icon="collapsed ? 'chevron_right' : 'chevron_left'"
      :label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
      :aria-expanded="!collapsed"
      @click="collapsed = !collapsed"
    />
    <slot v-if="!collapsed" />
  </GlassPanel>
</template>
