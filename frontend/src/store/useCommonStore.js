import { defineStore } from "pinia";
import { GET, POST, DELETE } from "../services";
import { useCartStore } from "@/store/useCartStore.js";
import { getPizzaPrice } from "@/common/helpers/getPizzaPrice.js";

export const useCommonStore = defineStore("common", {
  state: () => ({
    orders: [],
    dough: [],
    ingredients: [],
    sauces: [],
    sizes: [],
  }),
  getters: {
    getOrders: (state) => {
      const cartStore = useCartStore();

      return state.orders
        .map((order) => {
          return {
            ...order,
            orderPizzas: order.orderPizzas
              ? order.orderPizzas.map((pizza) => {
                  const ingredients = state.ingredients
                    // .filter((ingredient) =>
                    //   pizza.ingredients
                    //     .map((orderedIngr) => orderedIngr.ingredientId)
                    //     .includes(ingredient.id)
                    // )
                    .map((ingredient) => {
                      const targetIngredient = pizza.ingredients.find(
                        (orderedIngr) =>
                          orderedIngr.ingredientId === ingredient.id
                      );
                      return {
                        ...ingredient,
                        quantity: targetIngredient
                          ? targetIngredient.quantity
                          : 0,
                      };
                    });

                  const dough = state.dough.find(
                    (dough) => dough.id === pizza.doughId
                  );
                  const size = state.sizes.find(
                    (size) => size.id === pizza.sizeId
                  );
                  const sauce = state.sauces.find(
                    (sauce) => sauce.id === pizza.sauceId
                  );

                  const priceParams = {
                    ingredients,
                    dough,
                    size,
                    sauce,
                  };

                  return {
                    name: pizza.name,
                    dough,
                    size,
                    sauce,
                    ingredients,
                    id: pizza.id,
                    quantity: pizza.quantity,
                    price: getPizzaPrice(priceParams),
                  };
                })
              : [],
            orderMisc: order.orderMisc
              ? order.orderMisc.map((orderedMisc) => {
                  const misc = cartStore.miscs.find(
                    (misc) => misc.id === orderedMisc.miscId
                  );

                  return { ...misc, quantity: orderedMisc.quantity };
                })
              : [],
          };
        })
        .reverse();
    },
  },
  actions: {
    async getItems(item) {
      const { data } = await GET("/" + item);
      this[item] = data;
    },
    async getAllOrders() {
      const { data } = await GET("/orders");
      this.orders = data;
    },
    async addOrder(body) {
      await POST("/orders", { body });
      this.orders.push(body);
    },
    async deleteOrder(id) {
      await DELETE("/orders/{id}", { params: { path: { id } } });
      const targetIndex = this.orders.findIndex((order) => order.id === id);
      this.orders.splice(targetIndex, 1);
    },
    repeatOrder(id) {
      const targetOrder = this.orders.find((order) => order.id === id);
      this.orders.push({ ...targetOrder, id: Date.now() });
    },
  },
});
