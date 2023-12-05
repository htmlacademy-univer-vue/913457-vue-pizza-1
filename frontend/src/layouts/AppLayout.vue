<template>
  <AppHeader />
  <router-view v-slot="{ Component }">
    <transition
      name="view"
      appear
      enter-active-class="animate__animated animate__bounceInRight"
    >
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup>
import AppHeader from "./AppHeader.vue";
</script>
