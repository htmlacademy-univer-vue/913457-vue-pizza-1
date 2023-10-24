import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    pizzas: [],
    misc: [],
  }),
  getters: {
    totalPrice: (state) => {
      const pizzasPrice = state.pizzas.reduce(
        (sum, pizza) => sum + pizza.price,
        0
      );
      const miscPrice = state.misc.reduce((sum, el) => sum + el.price, 0);
      return pizzasPrice + miscPrice;
    },
  },
  actions: {},
});
