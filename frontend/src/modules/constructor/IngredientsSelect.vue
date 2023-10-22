<template>
  <div class="ingredients__filling">
    <p>Начинка:</p>

    <ul class="ingredients__list">
      <li
        v-for="ingredient in ingredients"
        :key="ingredient.id"
        class="ingredients__item"
      >
        <AppDrag :transfer-data="ingredient">
          <span :class="'filling ' + getClassName(ingredient.id)">{{
            ingredient.name
          }}</span>
        </AppDrag>

        <AppCounter v-model="counts[ingredient.id]" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, reactive, watch } from "vue";
import products from "@/common/data/ingredients.js";
import AppDrag from "@/common/components/AppDrag.vue";
import AppCounter from "@/common/components/AppCounter.vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {},
  },
  ingredients: {
    type: Array,
    default: () => [],
  },
});
watch(
  () => props.modelValue,
  (newValue) => {
    counts = newValue;
  }
);

const getClassName = (id) => "filling--" + products[id];

let counts = reactive({});
watch(counts, () => {
  emit("update:modelValue", counts);
});
</script>
