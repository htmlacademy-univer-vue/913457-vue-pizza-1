<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <p v-if="!commonStore.orders.length">Заказов нет</p>
    <div v-else>
      <section v-for="order of orders" :key="order.id" class="sheet order">
        <OrderItem
          :order="order"
          @delete="deleteOrder(order.id)"
          @repeat="repeatOrder(order)"
        />
      </section>
    </div>
  </div>
</template>

<script setup>
import OrderItem from "../modules/orders/OrderItem.vue";
import { useCommonStore } from "@/store/useCommonStore";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "vue-router";
import { computed } from "vue";

const commonStore = useCommonStore();
const cartStore = useCartStore();

const router = useRouter();
const repeatOrder = (order) => {
  order.orderPizzas.forEach((pizza) => cartStore.addPizza({ ...pizza }));
  order.orderMisc.forEach((misc) => cartStore.updateMisc({ ...misc }));
  router.push("/cart");
};

commonStore.getAllOrders();

const deleteOrder = (id) => {
  commonStore.deleteOrder(id);
};

const orders = computed(() => commonStore.getOrders);
</script>
