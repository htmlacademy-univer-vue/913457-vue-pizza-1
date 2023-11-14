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
  actions: {
    async getItems(item) {
      const response = await fetch("url/" + item);
      const result = await response.json();
      this[item] = result;
    },
  },
});
