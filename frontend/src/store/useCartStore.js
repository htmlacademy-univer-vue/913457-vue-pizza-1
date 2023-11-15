import { defineStore } from "pinia";
import { GET } from "../services";
import { miscsHandler } from "@/common/helpers/miscsHandler";

export const useCartStore = defineStore("cart", {
  state: () => ({
    pizzas: [],
    miscs: [],
  }),
  getters: {
    totalPrice: (state) => {
      const pizzasPrice = state.pizzas.length
        ? state.pizzas.reduce(
            (sum, pizza) => sum + pizza.price * pizza.quantity,
            0
          )
        : 0;
      const miscPrice = state.miscs.reduce(
        (sum, el) => +sum + +el.price * el.quantity,
        0
      );
      return pizzasPrice + miscPrice;
    },
    getPizzas: (state) => {
      return state.pizzas.map((pizza) => ({
        ...pizza,
        ingredients: pizza.ingredients.filter((product) => product.name),
      }));
    },
    orderedPizzas: (state) => {
      return state.pizzas.map((pizza) => {
        return {
          name: pizza.name,
          sauceId: pizza.sauce.id,
          doughId: pizza.dough.id,
          sizeId: pizza.size.id,
          quantity: pizza.quantity,
          ingredients: pizza.ingredients
            .filter((product) => product.name)
            .map((product) => {
              return { ingredientId: product.id, quantity: product.quantity };
            }),
        };
      });
    },
    orderedMiscs: (state) => {
      return state.miscs
        .filter((misc) => misc.quantity > 0)
        .map((misc) => {
          return {
            miscId: misc.id,
            quantity: misc.quantity,
          };
        });
    },
  },
  actions: {
    async getMiscs() {
      const { data } = await GET("/misc");
      this.miscs = miscsHandler(data);
    },
    addPizza(pizza) {
      this.pizzas.push(pizza);
    },
    updateMisc(newMisc) {
      const targetIndex = this.miscs.findIndex(
        (misc) => misc.id === newMisc.id
      );

      this.miscs.splice(targetIndex, 1, newMisc);
    },
    updatePizza(newPizza) {
      const targetIndex = this.pizzas.findIndex(
        (pizza) => pizza.id === newPizza.id
      );

      this.pizzas.splice(targetIndex, 1, newPizza);
    },
    cleanCart() {
      (this.pizzas = []), this.miscs.forEach((misc) => (misc.quantity = 0));
    },
  },
});
