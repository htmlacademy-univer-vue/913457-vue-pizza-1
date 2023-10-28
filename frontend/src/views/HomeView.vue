<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <div class="sheet__content dough">
              <label
                v-for="dough in types"
                :key="dough.id"
                class="dough__input dough__input--light"
              >
                <DoughSelect v-model="pizzaParams.dough" :dough="dough" />
              </label>
            </div>
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
              <label
                v-for="size in sizes"
                :key="size.id"
                class="diameter__input diameter__input--small"
              >
                <SizeSelect v-model="pizzaParams.size" :size="size" />
              </label>
            </div>
          </div>
        </div>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <div class="ingredients__sauce">
                <p>Основной соус:</p>

                <label
                  v-for="sauce in sauces"
                  :key="sauce.id"
                  class="radio ingredients__input"
                >
                  <SauceSelect v-model="pizzaParams.sauce" :sauce="sauce" />
                </label>
              </div>

              <div class="ingredients__filling">
                <p>Начинка:</p>

                <ul class="ingredients__list">
                  <li
                    v-for="(ingredient, index) in ingredients"
                    :key="ingredient.id"
                    class="ingredients__item"
                  >
                    <IngredientsSelect
                      v-model="pizzaParams.products[index]"
                      :index="index"
                      :ingredient="ingredient"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              v-model="pizzaParams.name"
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
            <button
              type="button"
              class="button"
              :disabled="isDisabled"
              @click="addPizza"
            >
              Готовьте!
            </button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
import { reactive, computed } from "vue";
import { useCartStore } from "@/store/useCartStore";
import ingredients from "@/mocks/ingredients.json";
import sauces from "@/mocks/sauces.json";
import sizes from "@/mocks/sizes.json";
import types from "@/mocks/dough.json";

import { useRoute } from "vue-router";

import DoughSelect from "@/modules/constructor/DoughSelect.vue";
import SizeSelect from "@/modules/constructor/SizeSelect.vue";
import SauceSelect from "@/modules/constructor/SauceSelect.vue";
import IngredientsSelect from "@/modules/constructor/IngredientsSelect.vue";
import PizzaItem from "@/modules/constructor/PizzaItem.vue";
import AppDrop from "@/common/components/AppDrop.vue";

const sum = computed(() => {
  const ingredientsTotalPrice = pizzaParams.products
    .filter((product) => product.name)
    .reduce((sum, ingredient) => sum + ingredient.price * ingredient.count, 0);

  const multiplier = pizzaParams.size.multiplier;

  return (
    multiplier *
    (pizzaParams.sauce.price + pizzaParams.dough.price + ingredientsTotalPrice)
  );
});

const cartStore = useCartStore();
const route = useRoute();
const { id } = route.params;
let pizzaParams = reactive(
  id
    ? cartStore.pizzas.find((pizza) => pizza.id === +id)
    : {
        dough: types[0],
        size: sizes[0],
        sauce: sauces[0],
        products: reactive(ingredients.map(() => ({}))),
        name: "",
        count: 1,
        id: Date.now(),
      }
);

const dropped = ({ ingredient, index }) => {
  let target = pizzaParams.products[index];

  if (target.name) {
    target.count = target.count === 3 ? target.count : ++target.count;
  } else {
    pizzaParams.products[index] = { ...ingredient, count: 1 };
  }
};

const addPizza = () => {
  const operation = id ? "updatePizza" : "addPizza";
  if (id) {
    cartStore[operation]({ ...pizzaParams, price: sum.value });
  } else {
    cartStore[operation]({ ...pizzaParams, price: sum.value });
  }
};

const isDisabled = computed(
  () => !pizzaParams.products.filter((product) => product.count).length
);
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

.content__diameter {
  width: 373px;
  margin-top: 15px;
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
