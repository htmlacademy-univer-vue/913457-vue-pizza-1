<template>
  <div class="order__wrapper">
    <div class="order__number">
      <b>Заказ #{{ order.id }}</b>
    </div>

    <div class="order__sum">
      <span>Сумма заказа: {{ order.price }} ₽</span>
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
            <li>Количество: {{ pizza.count }}</li>
            <li>{{ pizza.size.name }}, Тесто: {{ pizza.dough.name }}</li>
            <li>Соус: {{ pizza.sauce.name }}</li>
            <li>Ингредиенты: {{ getIngredients(pizza.products) }}</li>
          </ul>
        </div>
      </div>

      <p class="order__price">{{ pizza.count * pizza.price }} ₽</p>
    </li>
  </ul>

  <ul class="order__additional">
    <li v-for="misc of order.orderMisc" :key="misc.id">
      <img :src="misc.src" width="20" height="30" alt="Coca-Cola 0,5 литра" />
      <p>
        <span>{{ misc.name }}</span>
        <b>{{ misc.price }} ₽ x {{ misc.count }}</b>
      </p>
    </li>
  </ul>

  <p class="order__address">Адрес доставки: {{ order.orderAddress }}</p>
</template>

<script setup>
const emit = defineEmits(["delete", "repeat"]);

defineProps({
  order: {
    type: Object,
    default: () => ({}),
  },
});

const getIngredients = (ingredients) =>
  ingredients.map((product) => product.name.toLowerCase()).join(", ");
</script>
