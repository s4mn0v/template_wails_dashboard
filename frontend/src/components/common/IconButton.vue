<script setup lang="ts">
import MaterialIcon from "./MaterialIcon.vue";

defineProps<{
  icon: string;
  label: string;
}>();

defineEmits<{ click: [MouseEvent] }>();
</script>

<template>
  <button type="button" class="icon-button" :aria-label="label" :title="label" @click="$emit('click', $event)">
    <MaterialIcon :name="icon" :size="18" />
  </button>
</template>
