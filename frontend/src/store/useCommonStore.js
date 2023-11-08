import { defineStore } from "pinia";

export const useCommonStore = defineStore("common", {
  state: () => ({
    orders: [],
    doughList: [],
    ingredientList: [],
    sauceList: [],
    sizeList: [],
  }),
  getters: {},
  actions: {},
});
