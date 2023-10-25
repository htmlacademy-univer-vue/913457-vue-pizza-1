import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    addresses: [],
  }),
  getters: {},
  actions: {
    async getAddresses() {
      const response = await fetch("url");
      const result = await response.json();
      this.addresses = result;
    },
    async setAddress(address) {
      this.addresses.push(address);
    },
  },
});
