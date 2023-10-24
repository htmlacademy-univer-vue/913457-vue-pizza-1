<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="!modelValue"
      @click="emit('update:modelValue', modelValue - 1)"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="modelValue ?? 0"
    />
    <button
      type="button"
      :disabled="modelValue === 3"
      class="counter__button counter__button--plus"
      @click="emit('update:modelValue', modelValue + 1)"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits(["update:modelValue"]);
defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
});
</script>
