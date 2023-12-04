<template>
  <router-view />
</template>

<script setup>
import { getToken, removeToken } from "@/services/auth/auth.js";
import { useAuthStore } from "@/store/useAuthStore.js";
import { useCartStore } from "@/store/useCartStore.js";
import { useCommonStore } from "@/store/useCommonStore.js";

const token = getToken();

const initInfo = async () => {
  const cartStore = useCartStore();
  const commonStore = useCommonStore();

  const items = ["ingredients", "dough", "sauces", "sizes"];
  items.forEach(async (item) => {
    await commonStore.getItems(item);
  });

  await cartStore.getMiscs();

  if (token) {
    try {
      const authStore = useAuthStore();
      await authStore.setUserInfo();
    } catch (e) {
      removeToken();
      console.log(e);
    }
  }
};

initInfo();
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
body {
  justify-content: center;
  align-items: center;
}
.main__wrapper {
  padding-bottom: 30px;

  background-color: $white;
  box-shadow: $shadow-light;

  h1 {
    margin-bottom: 0;
    padding: 0 95px;

    text-align: center;

    @include b-s36-h42;
  }

  p {
    padding: 0 95px;

    text-align: center;

    font-size: 20px;
    line-height: 30px;
  }

  b {
    font-size: 1.2em;
  }
}

.main__header {
  margin-bottom: 30px;
  padding: 20px 0;

  background-color: $green-600;

  img {
    display: block;

    margin: 0 auto;
  }
}
</style>
