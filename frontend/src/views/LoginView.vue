<template>
  <div class="sign-form">
    <router-link to="/" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form action="test.html" method="post" @submit.prevent="login">
      <div class="sign-form__input">
        <label class="input">
          <span>E-mail</span>
          <input
            v-model="user.email"
            type="email"
            name="email"
            placeholder="example@mail.ru"
          />
        </label>
      </div>

      <div class="sign-form__input">
        <label class="input">
          <span>Пароль</span>
          <input
            v-model="user.password"
            type="password"
            name="pass"
            placeholder="***********"
          />
        </label>
      </div>
      <button type="submit" class="button">Авторизоваться</button>
    </form>
  </div>
</template>

<script setup>
import { useProfileStore } from "@/store/useProfileStore";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const profileStore = useProfileStore();
const router = useRouter();

const user = reactive({
  email: "",
  password: "",
});

const login = () => {
  try {
    profileStore.authorize(user);
    router.push("/profile");
  } catch (error) {
    console.warn(error);
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";

.sign-form {
  @include pf_center-all;

  z-index: 10;

  display: block;

  box-sizing: border-box;
  width: 455px;
  padding-top: 146px;
  padding-right: 32px;
  padding-bottom: 32px;
  padding-left: 32px;

  background: $white url("../assets/img/popup.svg") no-repeat center top;
  box-shadow: $shadow-light;

  &__title {
    margin-bottom: 24px;

    text-align: center;
  }

  &__input {
    margin-bottom: 16px;
  }

  button {
    margin: 0 auto;
    padding: 16px 14px;
  }
}
</style>
