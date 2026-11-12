<script setup lang="ts">
// Root shell: left sidebar / main content / right sidebar, each a separate
// floating glass panel stretched to the full window height.
import SidebarLeft from "../sidebar/SidebarLeft.vue";
import SidebarRight from "../sidebar/SidebarRight.vue";
import MainContent from "./MainContent.vue";
</script>

<template>
  <div class="app-shell">
    <SidebarLeft />
    <MainContent>
      <slot />
    </MainContent>
    <SidebarRight />
  </div>
</template>
