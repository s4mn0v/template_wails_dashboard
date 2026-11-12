<script setup lang="ts">
// Right floating sidebar (mirror of SidebarLeft — chevrons point the other
// way, and the toggle sits on the left edge instead of the right).
import { ref } from "vue";
import GlassPanel from "../common/GlassPanel.vue";
import IconButton from "../common/IconButton.vue";

const collapsed = ref(false);
</script>

<template>
  <GlassPanel tag="aside" class="sidebar sidebar--right" :class="{ 'is-collapsed': collapsed }">
    <IconButton
      class="sidebar__toggle"
      :icon="collapsed ? 'chevron_left' : 'chevron_right'"
      :label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
      :aria-expanded="!collapsed"
      @click="collapsed = !collapsed"
    />
    <slot v-if="!collapsed" />
  </GlassPanel>
</template>
