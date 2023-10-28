import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    pizzas: [],
    miscs: [
      {
        id: 0,
        name: "Coca-Cola 0,5 литра",
        cost: "x 56 ₽",
        src: "/src/assets/img/cola.svg",
        price: 56,
        count: 0,
      },
      {
        id: 1,
        name: "Острый соус",
        cost: "x 30 ₽",
        src: "/src/assets/img/sauce.svg",
        price: 30,
        count: 0,
      },
      {
        id: 2,
        name: "Картошка из печи",
        cost: "x 56 ₽",
        src: "/src/assets/img/potato.svg",
        price: 56,
        count: 0,
      },
    ],
  }),
  getters: {
    totalPrice: (state) => {
      const pizzasPrice = state.pizzas.length
        ? state.pizzas.reduce(
            (sum, pizza) => sum + pizza.price * pizza.count,
            0
          )
        : 0;
      const miscPrice = state.miscs.reduce(
        (sum, el) => +sum + +el.price * el.count,
        0
      );
      return pizzasPrice + miscPrice;
    },
    getPizzas: (state) => {
      return state.pizzas.map((pizza) => ({
        ...pizza,
        products: pizza.products.filter((product) => product.name),
      }));
    },
  },
  actions: {
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
      (this.pizzas = []), this.miscs.forEach((misc) => (misc.count = 0));
    },
  },
});
