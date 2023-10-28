import { defineStore } from "pinia";

export const useCommonStore = defineStore("common", {
  state: () => ({
    orders: [],
    doughList: [],
    ingredientList: [],
    sauceList: [],
    sizeList: [],
  }),
  getters: {
    getOrders: (state) => {
      return state.orders.map((order) => ({
        ...order,
        orderPizzas: order.orderPizzas.map((pizza) => ({
          ...pizza,
          products: pizza.products.filter((product) => product.name),
        })),
        orderMisc: order.orderMisc.filter((misc) => misc.count),
      }));
    },
  },
  actions: {
    async getItems(item) {
      const response = await fetch("url/" + item);
      const result = await response.json();
      this[item] = result;
    },
    addOrder(order) {
      this.orders.push(order);
      console.log("PUSHED_ ORDER", order);
    },
    deleteOrder(id) {
      const targetIndex = this.orders.findIndex((order) => order.id === id);
      this.orders.splice(targetIndex, 1);
    },
    repeatOrder(id) {
      const targetOrder = this.orders.find((order) => order.id === id);
      this.orders.push({ ...targetOrder, id: Date.now() });
    },
  },
});
