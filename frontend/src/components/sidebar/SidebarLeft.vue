<script setup lang="ts">
// Left floating sidebar. Empty by design — fill it via the default slot.
// Carries its own collapse toggle, so it stays self-contained regardless of
// how narrow the window gets.
import { computed, ref } from "vue";
import GlassPanel from "../common/GlassPanel.vue";
import IconButton from "../common/IconButton.vue";
import IconChevronLeft from "~icons/material-symbols/chevron-left";
import IconChevronRight from "~icons/material-symbols/chevron-right";

const collapsed = ref(false);
const toggleIcon = computed(() => (collapsed.value ? IconChevronRight : IconChevronLeft));
</script>

<template>
  <GlassPanel tag="aside" class="sidebar sidebar--left" :class="{ 'is-collapsed': collapsed }">
    <IconButton
      class="sidebar__toggle"
      :icon="toggleIcon"
      :label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
      :aria-expanded="!collapsed"
      @click="collapsed = !collapsed"
    />
    <slot v-if="!collapsed" />
  </GlassPanel>
</template>
