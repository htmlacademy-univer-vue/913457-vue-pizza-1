import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    addresses: [],
  }),
  getters: {},
  actions: {},
});
