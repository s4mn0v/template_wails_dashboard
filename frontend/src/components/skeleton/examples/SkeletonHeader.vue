<script setup lang="ts">
// Example: content header — page title + breadcrumb on the left, search and
// a couple of actions on the right.
import SkeletonBlock from "../SkeletonBlock.vue";
</script>

<template>
  <div class="skeleton-header" aria-busy="true" aria-label="Loading header">
    <div class="skeleton-stack">
      <SkeletonBlock width="9rem" height="0.875rem" />
      <SkeletonBlock width="6rem" height="0.5rem" />
    </div>
    <div class="skeleton-row">
      <SkeletonBlock shape="pill" width="11rem" height="1.75rem" class="skeleton-header__search" />
      <SkeletonBlock shape="circle" width="1.75rem" />
      <SkeletonBlock shape="circle" width="1.75rem" />
    </div>
  </div>
</template>
