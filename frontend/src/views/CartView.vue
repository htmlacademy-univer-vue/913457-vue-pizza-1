<template>
  <form method="post" class="layout-form" @submit.prevent="createOrder">
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
                  v-for="option, index of options"
                  :key="option"
                  :value="index">
                  {{ option }}
                </option>
              </select>
            </label>

            <label class="input input--big-label">
              <span>Контактный телефон:</span>
              <input type="text" name="tel" placeholder="+7 999-999-99-99" />
            </label>

            <div v-if="chosenWayToGet === 1" class="cart-form__address">
              <span class="cart-form__label">Новый адрес:</span>

              <div
                v-for="item of addressInfo"
                :key="item.name"
                :class="`cart-form__input ${item.class}`">
                <label class="input">
                  <span>{{ item.label }}</span>
                  <input
                    v-model="address[item.name]"
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
import OrderedPizza from "@/modules/cart/OrderedPizza.vue";
import OrderedMisc from "@/modules/cart/OrderedMisc.vue";

const cartStore = useCartStore();
const commonStore = useCommonStore();
const profileStore = useProfileStore();

const chosenWayToGet = ref(1);

const address = reactive({
  street: "",
  house: "",
  flat: "",
});

const createOrder = async () => {
  const orderAddress =
    chosenWayToGet.value === 0
      ? "самовывоз"
      : chosenWayToGet.value === 1
      ? Object.values(address).join(", ")
      : profileStore.addresses[0].name;

  const order = {
    id: Date.now(),
    orderPizzas: cartStore.pizzas,
    orderMisc: cartStore.miscs,
    orderAddress,
    price: cartStore.totalPrice,
  };

  await commonStore.addOrder(JSON.parse(JSON.stringify(order)));

  chosenWayToGet.value = 1;
  cartStore.cleanCart();
};

const options = computed( () => {
  const list = profileStore.addresses.map( ( address ) => address.name )
  return [
    'Получу сам',
    'Новый адрес',
    ...list,    
  ]
})

const addressInfo = [
  {
    name: 'street',
    label: 'Улица*',
    class: '',
    required: true,
  },
  {
    name: 'house',
    label: 'Дом*',
    class: 'cart-form__input--small',
    required: true,
  },
  {
    name: 'flat',
    label: 'Квартира',
    class: 'cart-form__input--small',
    required: false,
  },
]

</script>

<style lang="scss">
@import "@/assets/scss/app.scss";

.layout-form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
