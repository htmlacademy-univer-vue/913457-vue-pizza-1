<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <div class="user">
      <picture>
        <img
          src="@/assets/img/users/user5@2x.jpg"
          :alt="authStore.userInfo.name"
          width="72"
          height="72"
        />
      </picture>
      <div class="user__name">
        <span>{{ authStore.userInfo.name }}</span>
      </div>
      <p class="user__phone">
        Контактный телефон: <span>{{ authStore.userInfo.phone }}</span>
      </p>
    </div>

    <div
      v-for="(address, index) of profileStore.addresses"
      :key="address.id"
      class="layout__address"
    >
      <AddressItem
        :address="address"
        :index="index + 1"
        @save="profileStore.updateAddress"
        @delete="profileStore.deleteAddress(address.id)"
      />
    </div>

    <div v-if="addingMode" class="layout__address">
      <AddressItem
        :address="{}"
        :index="profileStore.addresses.length + 1"
        adding
        @add="addAddress"
        @delete="addingMode = false"
      />
    </div>

    <div class="layout__button">
      <button
        type="button"
        class="button button--border"
        @click="addingMode = true"
      >
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import AddressItem from "@/modules/profile/AddressItem.vue";
import { useProfileStore } from "@/store/useProfileStore";
import { useAuthStore } from "@/store/useAuthStore";

const addingMode = ref(false);

const profileStore = useProfileStore();
const authStore = useAuthStore();

profileStore.getAddresses();

const addAddress = (address) => {
  profileStore.setAddress({ ...address, userId: authStore.userInfo.id });
  addingMode.value = false;
};
</script>
