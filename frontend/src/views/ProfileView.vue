<template>
  <div class="layout__sidebar sidebar">
    <router-link to="/" class="logo layout__logo">
      <img
        src="@/assets/img/logo.svg"
        alt="V!U!E! Pizza logo"
        width="90"
        height="40"
      />
    </router-link>

    <main class="layout">
      <router-link
        class="layout__link"
        exact-active-class="layout__link--active"
        to="/profile/orders"
        >История заказов</router-link
      >
      <router-link
        class="layout__link"
        exact-active-class="layout__link--active"
        to="/profile"
        >Мои данные</router-link
      >
    </main>
  </div>
  <router-view />
</template>

<style lang="scss">
@import "@/assets/scss/app.scss";

.layout {
  &__logo {
    display: block;
    margin-bottom: 30px;
    padding-top: 10px;
    padding-bottom: 11px;
    background-color: $green-500;

    img {
      display: block;
      margin: 0 auto;
    }
  }

  &__sidebar {
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    width: 190px;
    height: 100%;
    background-color: rgba($green-500, 0.05);
  }

  &__link {
    @include b-s14-h16;

    display: block;
    padding: 8px 14px;
    transition: 0.3s;
    color: $black;

    &--active {
      background-color: rgba($green-500, 0.1);
    }

    &:hover {
      background-color: rgba($green-500, 0.2);
    }

    &:active {
      color: rgba($black, 0.5);
    }
  }
}
</style>
