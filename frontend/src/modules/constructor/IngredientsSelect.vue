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

        <div class="counter counter--orange ingredients__counter">
          <button
            type="button"
            class="counter__button counter__button--minus"
            :disabled="!counts[ingredient.id]"
            @click="decreaseCount(ingredient.id)"
          >
            <span class="visually-hidden">Меньше</span>
          </button>
          <input
            type="text"
            name="counter"
            class="counter__input"
            :value="counts[ingredient.id] ?? 0"
          />
          <button
            type="button"
            class="counter__button counter__button--plus"
            :disabled="counts[ingredient.id] === 3"
            @click="increaseCount(ingredient.id)"
          >
            <span class="visually-hidden">Больше</span>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, reactive, watch } from "vue";
import products from "@/common/data/ingredients.js";
import AppDrag from "@/common/components/AppDrag.vue";

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
const decreaseCount = (id) => {
  counts[id] = counts[id] ? --counts[id] : 0;
  emit("update:modelValue", counts);
};
const increaseCount = (id) => {
  counts[id] = counts[id] ? ++counts[id] : 1;
  emit("update:modelValue", counts);
};
</script>
