<script setup lang="ts">
import AppShell from "./components/layout/AppShell.vue";
import ThemeSwitcher from "./components/theme/ThemeSwitcher.vue";
// Example skeletons showing how each region is meant to be filled — swap
// them for real components (or render them while data loads).
import SkeletonNav from "./components/skeleton/examples/SkeletonNav.vue";
import SkeletonHeader from "./components/skeleton/examples/SkeletonHeader.vue";
import SkeletonDashboard from "./components/skeleton/examples/SkeletonDashboard.vue";
import SkeletonActivity from "./components/skeleton/examples/SkeletonActivity.vue";
</script>

<template>
  <AppShell>
    <template #sidebar-left><SkeletonNav /></template>
    <template #header><SkeletonHeader /></template>
    <SkeletonDashboard />
    <template #sidebar-right><SkeletonActivity /></template>
  </AppShell>
  <ThemeSwitcher />
</template>
