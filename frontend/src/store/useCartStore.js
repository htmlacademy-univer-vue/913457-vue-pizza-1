import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    pizzas: [],
    misc: [],
  }),
  getters: {},
  actions: {},
});
