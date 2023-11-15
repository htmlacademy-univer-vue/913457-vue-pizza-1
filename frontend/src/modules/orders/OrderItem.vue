<template>
  <div class="order__wrapper">
    <div class="order__number">
      <b>Заказ #{{ order.id }}</b>
    </div>

    <div class="order__sum">
      <span>Сумма заказа: {{ orderPrice }} ₽</span>
    </div>

    <div class="order__button">
      <button
        type="button"
        class="button button--border"
        @click="emit('delete')"
      >
        Удалить
      </button>
    </div>
    <div class="order__button">
      <button type="button" class="button" @click="emit('repeat')">
        Повторить
      </button>
    </div>
  </div>

  <ul class="order__list">
    <li v-for="pizza of order.orderPizzas" :key="pizza.id" class="order__item">
      <div class="product">
        <img
          src="@/assets/img/product.svg"
          class="product__img"
          width="56"
          height="56"
          alt="pizza"
        />
        <div class="product__text">
          <h2>{{ pizza.name }}</h2>
          <ul>
            <li>Количество: {{ pizza.quantity }}</li>
            <li>{{ pizza.size.name }}, Тесто: {{ pizza.dough.name }}</li>
            <li>Соус: {{ pizza.sauce.name }}</li>
            <li>Ингредиенты: {{ getIngredients(pizza.ingredients) }}</li>
          </ul>
        </div>
      </div>

      <p class="order__price">{{ pizza.quantity * pizza.price }} ₽</p>
    </li>
  </ul>

  <ul class="order__additional">
    <li v-for="misc of order.orderMisc" :key="misc.id">
      <img
        :src="getPublicImage(misc.image)"
        width="20"
        height="30"
        alt="Coca-Cola 0,5 литра"
      />
      <p>
        <span>{{ misc.name }}</span>
        <b>{{ misc.price }} ₽ x {{ misc.quantity }}</b>
      </p>
    </li>
  </ul>

  <p class="order__address">Адрес доставки: {{ address }}</p>
</template>

<script setup>
import { computed } from "vue";
import { getPublicImage } from "@/common/helpers/getPublicImage";

const emit = defineEmits(["delete", "repeat"]);

const props = defineProps({
  order: {
    type: Object,
    default: () => ({}),
  },
});

const address = computed(() =>
  props.order.orderAddress ? props.order.orderAddress.name : "-"
);

const orderPrice = computed(() => {
  let price = 0;
  props.order.orderPizzas.forEach(
    (pizza) => (price += pizza.quantity * pizza.price)
  );
  props.order.orderMisc.forEach(
    (misc) => (price += misc.quantity * misc.price)
  );
  return price;
});

const getIngredients = (ingredients) =>
  ingredients
    .filter((ingredient) => ingredient.quantity > 0)
    .map((product) => product.name.toLowerCase())
    .join(", ");
</script>
