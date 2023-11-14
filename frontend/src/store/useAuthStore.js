import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    userInfo: {},
  }),
  getters: {},
  actions: {
    setUserInfo(user) {
      this.userInfo = user;
    },
  },
});
