<template>
  <div class="product cart-list__product">
    <img
      src="@/assets/img/product.svg"
      class="product__img"
      width="56"
      height="56"
      :alt="finalName"
    />
    <div class="product__text">
      <h2>{{ finalName }}</h2>
      <ul>
        <li>{{ pizza.size.name }}, {{ pizza.dough.name }} тесто</li>
        <li>Соус: {{ pizza.sauce.name }}</li>
        <li>Начинка: {{ ingredientsString }}</li>
      </ul>
    </div>
  </div>

  <AppCounter
    :model-value="pizza.quantity"
    class-name="counter__button--orange"
    :max="5"
    @change="updateCount"
  />

  <div class="cart-list__price">
    <b>{{ pizza.price * pizza.quantity }} ₽</b>
  </div>

  <div class="cart-list__button">
    <router-link :to="`/${pizza.id}`" class="cart-list__edit">
      Изменить
    </router-link>
  </div>
</template>

<script setup>
import { computed } from "vue";
import AppCounter from "@/common/components/AppCounter.vue";
import { useCartStore } from "@/store/useCartStore";

const cartStore = useCartStore();

const props = defineProps({
  pizza: {
    type: Object,
    default: () => ({}),
  },
});

const finalName = computed(() =>
  props.pizza.name.length ? props.pizza.name : "Пицца"
);
const ingredientsString = computed(() =>
  props.pizza.ingredients
    .filter((ingredient) => ingredient.quantity > 0)
    .map((ingredient) => ingredient.name.toLowerCase())
    .join(", ")
);

const updateCount = (count) => {
  const target = cartStore.pizzas.find((pizza) => pizza.id === props.pizza.id);
  target.quantity = count;
};
</script>
