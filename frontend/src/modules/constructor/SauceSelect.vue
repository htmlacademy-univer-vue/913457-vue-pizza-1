<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <label class="radio ingredients__input">
      <input type="radio" name="sauce" value="tomato" checked />
      <span>Томатный</span>
    </label>
    <label class="radio ingredients__input">
      <input type="radio" name="sauce" value="creamy" />
      <span>Сливочный</span>
    </label>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});
</script>
