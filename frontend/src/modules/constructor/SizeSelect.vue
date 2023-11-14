<template>
  <input
    class="visually-hidden"
    type="radio"
    name="diameter"
    :value="size.id"
    :checked="size.id === modelValue.id"
    @input="emit('update:modelValue', size)"
  />
  <span>{{ size.name }}</span>
</template>

<script setup>
const emit = defineEmits(["update:modelValue"]);

defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  size: {
    type: Object,
    default: () => ({}),
  },
});
</script>
