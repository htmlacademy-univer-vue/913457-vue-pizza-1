<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <div class="user">
      <picture>
        <img
          src="@/assets/img/users/user5@2x.jpg"
          alt="Василий Ложкин"
          width="72"
          height="72"
        />
      </picture>
      <div class="user__name">
        <span>Василий Ложкин</span>
      </div>
      <p class="user__phone">
        Контактный телефон: <span>+7 999-999-99-99</span>
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
        @delete="() => profileStore.deleteAddress(address.id)"
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

const addingMode = ref(false);

const profileStore = useProfileStore();

const addAddress = (address) => {
  profileStore.setAddress(address);
  addingMode.value = false;
};
</script>
