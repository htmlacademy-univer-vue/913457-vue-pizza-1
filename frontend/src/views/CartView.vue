<template>
  <form
    method="post"
    class="layout-form"
    :class="{ dark: show }"
    @submit.prevent="createOrder"
  >
    <transition name="bounce">
      <PopupItem v-if="show" />
    </transition>
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div v-if="!cartStore.pizzas.length" class="sheet cart__empty">
          <p>В корзине нет ни одной пиццы</p>
        </div>

        <ul v-else class="cart-list sheet">
          <li
            v-for="(pizza, index) of cartStore.getPizzas"
            :key="index"
            class="cart-list__item"
          >
            <OrderedPizza :pizza="pizza" />
          </li>
        </ul>

        <div class="cart__additional">
          <ul class="additional-list">
            <li
              v-for="misc of cartStore.miscs"
              :key="misc.name"
              class="additional-list__item sheet"
            >
              <OrderedMisc :misc="misc" />
            </li>
          </ul>
        </div>

        <div class="cart__form">
          <div class="cart-form">
            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <select v-model="chosenWayToGet" name="test" class="select">
                <option
                  v-for="option of options"
                  :key="option.id"
                  :value="option"
                >
                  {{ option.name }}
                </option>
              </select>
            </label>

            <label class="input input--big-label">
              <span>Контактный телефон:</span>
              <input
                v-model="newPhone"
                type="text"
                name="tel"
                placeholder="+7 999-999-99-99"
              />
            </label>

            <div v-if="chosenWayToGet.id === -2" class="cart-form__address">
              <span class="cart-form__label">Новый адрес:</span>

              <div
                v-for="item of addressInfo"
                :key="item.name"
                :class="`cart-form__input ${item.class}`"
              >
                <label class="input">
                  <span>{{ item.label }}</span>
                  <input
                    v-model="selectedAddress[item.name]"
                    :required="item.required"
                    type="text"
                    :name="item.name"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <section class="footer">
      <div class="footer__more">
        <router-link to="/" class="button button--border button--arrow">
          Хочу еще одну
        </router-link>
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ cartStore.totalPrice }} ₽</b>
      </div>

      <div class="footer__submit">
        <button
          :disabled="!cartStore.pizzas.length"
          type="submit"
          class="button"
        >
          Оформить заказ
        </button>
      </div>
    </section>
  </form>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useCartStore } from "@/store/useCartStore";
import { useCommonStore } from "@/store/useCommonStore";
import { useProfileStore } from "@/store/useProfileStore";
import { useAuthStore } from "@/store/useAuthStore";
import OrderedPizza from "@/modules/cart/OrderedPizza.vue";
import OrderedMisc from "@/modules/cart/OrderedMisc.vue";
import PopupItem from "@/common/components/PopupItem.vue";

const cartStore = useCartStore();
const commonStore = useCommonStore();
const profileStore = useProfileStore();
const authStore = useAuthStore();

const chosenWayToGet = ref({ name: "Получу сам", id: -1 });

profileStore.getAddresses();
const buildAddress = (street, building, flat, comment) => {
  return { street, building, flat, comment };
};

const selectedAddress = reactive({
  street: "",
  house: "",
  flat: "",
});

const newPhone = ref(authStore.userInfo.phone);
const createOrder = async () => {
  const userId = authStore.userInfo.id ?? null;
  const phone = newPhone.value ?? authStore.userInfo.phone;

  const address =
    chosenWayToGet.value.id === -1
      ? undefined
      : chosenWayToGet.value === -2
      ? buildAddress(
          selectedAddress.street,
          selectedAddress.building,
          selectedAddress.flat,
          ""
        )
      : chosenWayToGet.value;

  const order = {
    userId,
    phone,
    address,
    pizzas: cartStore.orderedPizzas,
    misc: cartStore.orderedMiscs,
  };

  await commonStore.addOrder(JSON.parse(JSON.stringify(order)));

  chosenWayToGet.value = { name: "Получу сам", id: -1 };
  cartStore.cleanCart();

  show.value = true;
};

const options = computed(() => {
  return [
    { name: "Получу сам", id: -1 },
    { name: "Новый адрес", id: -2 },
    ...profileStore.addresses,
  ];
});

const addressInfo = [
  {
    name: "street",
    label: "Улица*",
    class: "",
    required: true,
  },
  {
    name: "house",
    label: "Дом*",
    class: "cart-form__input--small",
    required: true,
  },
  {
    name: "flat",
    label: "Квартира",
    class: "cart-form__input--small",
    required: false,
  },
];
const show = ref(false);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.layout-form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-top: 62px;
}

.dark {
  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
