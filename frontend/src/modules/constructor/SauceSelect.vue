<template>
  <input
    type="radio"
    name="sauce"
    :value="sauce.id"
    :checked="sauce.id === modelValue.id"
    @input="emit('update:modelValue', sauce)"
  />
  <span>{{ sauce.name }}</span>
</template>

<script setup>
import { defineProps } from "vue";

const emit = defineEmits(["update:modelValue"]);

defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  sauce: {
    type: Object,
    default: () => ({}),
  },
});
</script>
