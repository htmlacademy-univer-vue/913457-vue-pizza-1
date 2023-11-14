<template>
  <p class="additional-list__description">
    <img :src="misc.src" width="39" height="60" :alt="misc.name" />
    <span>{{ misc.name }}</span>
  </p>

  <div class="additional-list__wrapper">
    <AppCounter
      :model-value="misc.count"
      class-name="counter__button--orange"
      :max="5"
      @change="updateCount"
    />

    <div class="additional-list__price">
      <b>{{ misc.cost }}</b>
    </div>
  </div>
</template>

<script setup>
import AppCounter from "@/common/components/AppCounter.vue";
import { useCartStore } from "@/store/useCartStore";

const cartStore = useCartStore();

const props = defineProps({
  misc: {
    type: Object,
    default: () => ({}),
  },
});

const updateCount = (count) => {
  const target = cartStore.miscs.find((misc) => misc.id === props.misc.id);
  target.count = count;
};
</script>
