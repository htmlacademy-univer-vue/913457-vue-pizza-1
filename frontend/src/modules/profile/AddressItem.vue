<template>
  <div class="sheet">
    <div class="address-form__header">
      <b>Адрес №{{ index }}. {{ address.name }}</b>
      <div v-if="!adding" class="address-form__edit">
        <button type="button" class="icon" @click="change">
          <span class="visually-hidden">Изменить адрес</span>
        </button>
      </div>
    </div>
    <form
      v-if="editedAddressId === address.id || adding"
      class="address-form address-form--opened"
      @submit.prevent="save"
    >
      <div class="address-form__wrapper">
        <div class="address-form__input">
          <label class="input">
            <span>Название адреса*</span>
            <input
              v-model="editedAddress.name"
              type="text"
              name="addr-name"
              placeholder="Введите название адреса"
              required
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--normal">
          <label class="input">
            <span>Улица*</span>
            <input
              v-model="editedAddress.street"
              type="text"
              name="addr-street"
              placeholder="Введите название улицы"
              required
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Дом*</span>
            <input
              v-model="editedAddress.building"
              type="text"
              name="addr-house"
              placeholder="Введите номер дома"
              required
            />
          </label>
        </div>
        <div class="address-form__input address-form__input--size--small">
          <label class="input">
            <span>Квартира</span>
            <input
              v-model="editedAddress.flat"
              type="text"
              name="addr-apartment"
              placeholder="Введите № квартиры"
            />
          </label>
        </div>
        <div class="address-form__input">
          <label class="input">
            <span>Комментарий</span>
            <input
              v-model="editedAddress.comment"
              type="text"
              name="addr-comment"
              placeholder="Введите комментарий"
            />
          </label>
        </div>
      </div>

      <div class="address-form__buttons">
        <button
          type="button"
          class="button button--transparent"
          @click="deleteAddress"
        >
          {{ adding ? "Отменить" : "Удалить" }}
        </button>
        <button type="submit" class="button">Сохранить</button>
      </div>
    </form>
    <div v-else class="sheet address-form">
      <p>
        {{
          address.street + ", д. " + address.building + ", кв " + address.flat
        }}
      </p>
      <small>Позвоните, пожалуйста, от проходной</small>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const emit = defineEmits(["save", "delete", "add"]);

const props = defineProps({
  address: {
    type: Object,
    default: () => ({}),
  },
  index: {
    type: Number,
    default: 0,
  },
  adding: {
    type: Boolean,
    default: false,
  },
});

const editedAddressId = ref(-1);
let editedAddress = reactive({ ...props.address });

const save = () => {
  editedAddressId.value = -1;

  const keyword = props.adding ? "add" : "save";

  emit(keyword, editedAddress);
};
const deleteAddress = () => {
  editedAddressId.value = -1;
  emit("delete");
};

const change = () => {
  editedAddressId.value =
    editedAddressId.value === props.address.id ? -1 : props.address.id;

  if (editedAddressId.value === -1) {
    editedAddress = JSON.parse(JSON.stringify(props.address));
  }
};
</script>
