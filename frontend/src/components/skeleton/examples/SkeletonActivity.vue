<script setup lang="ts">
// Example: right sidebar — a summary card and an activity feed.
import SkeletonBlock from "../SkeletonBlock.vue";

const feed = ["75%", "60%", "85%", "55%", "70%", "65%"];
</script>

<template>
  <div class="skeleton-activity" aria-busy="true" aria-label="Loading activity">
    <div class="skeleton-card skeleton-stack">
      <SkeletonBlock width="40%" height="0.5rem" />
      <SkeletonBlock width="60%" height="1.25rem" />
      <SkeletonBlock width="100%" height="0.375rem" shape="pill" />
    </div>

    <SkeletonBlock width="5rem" height="0.625rem" />
    <div v-for="(w, i) in feed" :key="i" class="skeleton-row skeleton-activity__item">
      <SkeletonBlock shape="circle" width="1.5rem" />
      <div class="skeleton-stack skeleton-grow">
        <SkeletonBlock :width="w" height="0.5625rem" />
        <SkeletonBlock width="35%" height="0.5rem" />
      </div>
    </div>
  </div>
</template>
