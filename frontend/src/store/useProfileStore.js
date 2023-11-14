import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    userInfo: {},
    authorized: true,
    addresses: [
      {
        id: 0,
        name: "Тест1",
        street: "Невский пр.",
        building: "22",
        flat: "46",
        comment: "string",
        userId: "string",
      },
      {
        id: 1,
        name: "Тест2",
        street: "Невский пр.",
        building: "23",
        flat: "42",
        comment: "string",
        userId: "string",
      },
    ],
  }),
  getters: {},
  actions: {
    setUserInfo(user) {
      this.userInfo = user;
    },
    authorize(form) {
      console.log(form);
      this.authorized = true;
    },
    logout() {
      this.authorized = false;
    },
    async getAddresses() {
      const response = await fetch("url");
      const result = await response.json();
      this.addresses = result;
    },
    async setAddress(address) {
      this.addresses.push(address);
    },
    async updateAddress(updatedAddress) {
      const targetIndex = this.addresses.findIndex(
        (address) => address.id === updatedAddress.id
      );

      this.addresses.splice(targetIndex, 1, updatedAddress);
    },
    async deleteAddress(id) {
      const targetIndex = this.addresses.findIndex(
        (address) => address.id === id
      );
      this.addresses.splice(targetIndex, 1);
    },
  },
});
