import { defineStore } from "pinia";
import { GET, POST, DELETE, PUT } from "../services";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    addresses: [],
  }),
  getters: {},
  actions: {
    async getAddresses() {
      const { data } = await GET("/addresses");
      if (data) {
        this.addresses = data;
      }
    },
    async setAddress(body) {
      await POST("/addresses", { body });
      this.addresses.push(body);
    },
    async updateAddress(body) {
      await PUT("/addresses/{id}", { body, params: { path: { id: body.id } } });

      const targetIndex = this.addresses.findIndex(
        (address) => address.id === body.id
      );
      this.addresses.splice(targetIndex, 1, body);
    },
    async deleteAddress(id) {
      await DELETE("/addresses/{id}", { params: { path: { id } } });

      const targetIndex = this.addresses.findIndex(
        (address) => address.id === id
      );
      this.addresses.splice(targetIndex, 1);
    },
    cleanAddresses() {
      this.addresses = [];
    },
  },
});
