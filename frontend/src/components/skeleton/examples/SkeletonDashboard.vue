<script setup lang="ts">
// Example: main canvas — KPI cards, a bar chart and a table. Tall enough to
// scroll, so it also shows off the themed scrollbar.
import SkeletonBlock from "../SkeletonBlock.vue";

const kpis = 4;
// Fixed (not random) so the layout is stable between renders.
const bars = [45, 62, 38, 70, 55, 82, 48, 66, 90, 58, 74, 52];
const rows = ["60%", "45%", "70%", "50%", "65%", "40%"];
</script>

<template>
  <div class="skeleton-dashboard" aria-busy="true" aria-label="Loading dashboard">
    <div class="skeleton-dashboard__kpis">
      <div v-for="k in kpis" :key="k" class="skeleton-card skeleton-stack">
        <SkeletonBlock width="50%" height="0.5rem" />
        <SkeletonBlock width="70%" height="1.5rem" />
        <SkeletonBlock shape="pill" width="3rem" height="1rem" />
      </div>
    </div>

    <div class="skeleton-card skeleton-stack">
      <div class="skeleton-row skeleton-row--between">
        <SkeletonBlock width="8rem" height="0.75rem" />
        <SkeletonBlock shape="pill" width="5rem" height="1.25rem" />
      </div>
      <div class="skeleton-chart">
        <SkeletonBlock v-for="(h, i) in bars" :key="i" width="100%" :height="`${h}%`" />
      </div>
    </div>

    <div class="skeleton-card skeleton-stack">
      <SkeletonBlock width="7rem" height="0.75rem" />
      <div v-for="(w, i) in rows" :key="i" class="skeleton-row skeleton-table__row">
        <SkeletonBlock shape="circle" width="1.75rem" />
        <div class="skeleton-stack skeleton-grow">
          <SkeletonBlock :width="w" height="0.625rem" />
          <SkeletonBlock width="30%" height="0.5rem" />
        </div>
        <SkeletonBlock shape="pill" width="3.5rem" height="1.25rem" />
      </div>
    </div>
  </div>
</template>
