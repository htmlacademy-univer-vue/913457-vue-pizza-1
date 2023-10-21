<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <label
      v-for="sauce in sauces"
      :key="sauce.id"
      class="radio ingredients__input"
    >
      <input
        type="radio"
        name="sauce"
        :value="sauce.id"
        :checked="sauce.id === modelValue"
        @input="emit('update:modelValue', +$event.target.value)"
      />
      <span>{{ sauce.name }}</span>
    </label>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const emit = defineEmits(["update:modelValue"]);

defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  sauces: {
    type: Array,
    default: () => [],
  },
});
</script>
