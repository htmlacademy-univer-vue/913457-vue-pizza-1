<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <DoughSelect v-model="pizzaParams.dough" :types="doughTypes" />

        <SizeSelect v-model="pizzaParams.size" :sizes="sizes" />

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <SauceSelect v-model="pizzaParams.sauce" :sauces="sauces" />

              <IngredientsSelect
                v-model="pizzaParams.products"
                :ingredients="ingredients"
              />
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <AppDrop @drop="dropped">
            <PizzaItem :params="pizzaParams" />
          </AppDrop>

          <div class="content__result">
            <p>Итого: {{ sum }} ₽</p>
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
import { reactive, computed } from "vue";
import ingredients from "@/mocks/ingredients.json";
import sizes from "@/mocks/sizes.json";
import sauces from "@/mocks/sauces.json";
import doughTypes from "@/mocks/dough.json";

import DoughSelect from "@/modules/constructor/DoughSelect.vue";
import SizeSelect from "@/modules/constructor/SizeSelect.vue";
import SauceSelect from "@/modules/constructor/SauceSelect.vue";
import IngredientsSelect from "@/modules/constructor/IngredientsSelect.vue";
import PizzaItem from "@/modules/constructor/PizzaItem.vue";
import AppDrop from "@/common/components/AppDrop.vue";

const getIngredientPrice = (targetId) => {
  return ingredients.find((ingredient) => ingredient.id === +targetId).price;
};
const sum = computed(() => {
  const multiplier = sizes.find(
    (size) => size.id === pizzaParams.size
  ).multiplier;
  const saucePrice = sauces.find(
    (sauce) => sauce.id === pizzaParams.sauce
  ).price;
  const doughPrice = doughTypes.find(
    (dough) => dough.id === pizzaParams.dough
  ).price;

  const products = Object.entries(pizzaParams.products);

  let ingredientTotalPrice = 0;
  products.forEach((product) => {
    const price = getIngredientPrice(product[0]) * product[1];

    ingredientTotalPrice += price;
  });

  return multiplier * (saucePrice + doughPrice + ingredientTotalPrice);
});

const pizzaParams = reactive({
  dough: 1,
  size: 2,
  sauce: 2,
  products: reactive({}),
});

const dropped = (body) => {
  if (!pizzaParams.products[body.id]) {
    pizzaParams.products[body.id] = 1;
  } else if (pizzaParams.products[body.id] < 3) {
    pizzaParams.products[body.id] += 1;
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.content {
  padding-top: 20px;
}

.content__wrapper {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  width: 920px;
  margin: 0 auto;
  padding-right: 2.12%;
  padding-bottom: 30px;
  padding-left: 2.12%;
}

.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.content__pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  p {
    @include b-s24-h28;

    margin: 0;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}
</style>
