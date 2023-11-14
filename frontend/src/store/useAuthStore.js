import { defineStore } from "pinia";
import { GET, POST, DELETE, setToken, removeToken } from "../services";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    userInfo: {},
    auth: false,
  }),
  getters: {
    authorized(state) {
      return state.userInfo.id;
    },
  },
  actions: {
    async setUserInfo() {
      const { data } = await GET("/whoAmI");
      this.userInfo = data;
    },
    async authorize(body) {
      const { data, error } = await POST("/login", { body });

      if (!error) {
        const { token } = data;

        setToken(token);
        this.auth = true;
        this.setUserInfo();
      }

      return !error;
    },
    cleanUser() {
      this.userInfo = {};
      this.auth = false;
    },
    async logout() {
      DELETE("/logout");
      removeToken();
      this.cleanUser();
    },
  },
});
