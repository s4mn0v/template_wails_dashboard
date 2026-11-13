<script setup lang="ts">
// Example: left sidebar — brand, navigation groups and a user card pinned
// to the bottom.
import SkeletonBlock from "../SkeletonBlock.vue";

const groups = [
  { label: "3.5rem", items: ["70%", "55%", "80%", "60%"] },
  { label: "4.5rem", items: ["65%", "75%", "50%"] },
];
</script>

<template>
  <div class="skeleton-nav" aria-busy="true" aria-label="Loading navigation">
    <div class="skeleton-row">
      <SkeletonBlock shape="circle" width="1.75rem" />
      <SkeletonBlock width="6rem" height="0.875rem" />
    </div>

    <div v-for="(group, g) in groups" :key="g" class="skeleton-nav__group">
      <SkeletonBlock :width="group.label" height="0.5rem" />
      <div v-for="(w, i) in group.items" :key="i" class="skeleton-row skeleton-nav__item">
        <SkeletonBlock width="1rem" height="1rem" />
        <SkeletonBlock :width="w" height="0.625rem" />
      </div>
    </div>

    <div class="skeleton-card skeleton-row skeleton-nav__user">
      <SkeletonBlock shape="circle" width="2rem" />
      <div class="skeleton-stack skeleton-grow">
        <SkeletonBlock width="70%" height="0.625rem" />
        <SkeletonBlock width="45%" height="0.5rem" />
      </div>
    </div>
  </div>
</template>
