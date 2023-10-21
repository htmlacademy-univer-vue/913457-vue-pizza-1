<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <DoughSelect v-model="dough" :types="doughTypes" />

        <SizeSelect v-model="size" :sizes="sizes" />

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <SauceSelect v-model="sauce" />

              <IngredientsSelect
                v-model="ingredient"
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

          <PizzaItem />

          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
import { ref } from "vue";
import ingredients from "@/mocks/ingredients.json";
import sizes from "@/mocks/sizes.json";
import doughTypes from "@/mocks/dough.json";

import DoughSelect from "@/modules/constructor/DoughSelect.vue";
import SizeSelect from "@/modules/constructor/SizeSelect.vue";
import SauceSelect from "@/modules/constructor/SauceSelect.vue";
import IngredientsSelect from "@/modules/constructor/IngredientsSelect.vue";
import PizzaItem from "@/modules/constructor/PizzaItem.vue";

const dough = ref("");
const size = ref("");
const sauce = ref("");
const ingredient = ref("");
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
