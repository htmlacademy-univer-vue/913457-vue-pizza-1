import { defineStore } from "pinia";

export const usePizzaStore = defineStore("pizza", {
  state: () => ({
    dough: {},
    ingredients: [],
    sauce: {},
    size: {},
  }),
  getters: {},
  actions: {},
});
