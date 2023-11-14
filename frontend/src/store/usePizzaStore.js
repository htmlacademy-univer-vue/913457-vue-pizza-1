import { defineStore } from "pinia";

export const usePizzaStore = defineStore("pizza", {
  state: () => ({
    dough: {},
    ingredients: [],
    sauce: {},
    size: {},
  }),
  getters: {
    price: (state) => {
      const ingredientsTotalPrice = state.ingredients.reduce(
        (sum, ingredient) => sum + ingredient.price,
        0
      );

      const multiplier = state.size.multiplier;

      return (
        multiplier *
        (state.sauce.price + state.dough.price + ingredientsTotalPrice)
      );
    },
  },
  actions: {
    setSimpleParameter(name, value) {
      this[name] = value;
    },
    setIngredients(ingredient) {
      this.ingredients.push(ingredient);
    },
  },
});
