<template>
  <div class="content__constructor">
    <div :class="getPizzaClass()">
      <div class="pizza__wrapper">
        <transition-group name="ingredients">
          <div
            v-for="ingredient in displayedIngredients"
            :key="ingredient.id"
            :class="getIngredientClass(ingredient)"
          ></div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import sauces from "@/common/data/sauces.js";
import doughSizes from "@/common/data/doughSizes.js";
import ingredients from "@/common/data/ingredients.js";

const props = defineProps({
  params: {
    type: Object,
    default: () => {},
  },
});
const displayedIngredients = computed(() =>
  props.params.ingredients.filter((product) => product.name)
);

const getPizzaClass = () =>
  `pizza pizza--foundation--${doughSizes[props.params.dough.id]}-${
    sauces[props.params.sauce.id]
  }`;
const getIngredientClass = (ingredient) => {
  const countClasses = {
    1: "",
    2: "pizza__filling--second",
    3: "pizza__filling--third",
  };
  const countClass = countClasses[ingredient.quantity];
  return ingredient.quantity
    ? "pizza__filling " +
        `pizza__filling--${ingredients[ingredient.id]} ` +
        countClass
    : "";
};
</script>

<style lang="scss" scoped>
.content__constructor {
  width: 315px;
  margin-top: 25px;
  margin-right: auto;
  margin-left: auto;
}

.ingredients-enter-active,
.ingredients-leave-active {
  transition: all 0.5s ease;
}

.ingredients-enter-from,
.ingredients-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>
