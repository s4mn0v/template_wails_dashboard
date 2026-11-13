<script setup lang="ts">
// Root shell: left sidebar / main content / right sidebar, each a separate
// floating glass panel stretched to the full window height. Every region is
// empty by design and filled through a slot:
//   #sidebar-left, #header, default (the canvas), #sidebar-right
import SidebarLeft from "../sidebar/SidebarLeft.vue";
import SidebarRight from "../sidebar/SidebarRight.vue";
import MainContent from "./MainContent.vue";
</script>

<template>
  <div class="app-shell">
    <SidebarLeft>
      <slot name="sidebar-left" />
    </SidebarLeft>
    <MainContent>
      <template #header>
        <slot name="header" />
      </template>
      <slot />
    </MainContent>
    <SidebarRight>
      <slot name="sidebar-right" />
    </SidebarRight>
  </div>
</template>
