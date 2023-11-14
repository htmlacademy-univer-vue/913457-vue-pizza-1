<template>
  <AppDrag :transfer-data="{ ingredient, index }">
    <span :class="'filling ' + getClassName(ingredient.id)">{{
      ingredient.name
    }}</span>
  </AppDrag>

  <AppCounter
    :model-value="modelValue.count"
    @change="emit('update:modelValue', { ...ingredient, count: $event })"
  />
</template>

<script setup>
import { defineProps } from "vue";
import products from "@/common/data/ingredients.js";
import AppDrag from "@/common/components/AppDrag.vue";
import AppCounter from "@/common/components/AppCounter.vue";

const emit = defineEmits(["update:modelValue"]);
defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  ingredient: {
    type: Object,
    default: () => ({}),
  },
  index: {
    type: Number,
    default: 0,
  },
});

const getClassName = (id) => "filling--" + products[id];
</script>
