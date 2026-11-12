<script setup lang="ts">
import type { Component } from "vue";
import AppIcon from "./AppIcon.vue";

defineProps<{
  icon: Component;
  label: string;
}>();

defineEmits<{ click: [MouseEvent] }>();
</script>

<template>
  <button type="button" class="icon-button" :aria-label="label" :title="label" @click="$emit('click', $event)">
    <AppIcon :icon="icon" :size="18" />
  </button>
</template>
