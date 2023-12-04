<template>
  <p class="additional-list__description">
    <img
      :src="getPublicImage(misc.image)"
      width="39"
      height="60"
      :alt="misc.name"
    />
    <span>{{ misc.name }}</span>
  </p>

  <div class="additional-list__wrapper">
    <AppCounter
      :model-value="misc.quantity"
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
import { getPublicImage } from "@/common/helpers/getPublicImage";

const cartStore = useCartStore();

const props = defineProps({
  misc: {
    type: Object,
    default: () => ({}),
  },
});

const updateCount = (count) => {
  const target = cartStore.miscs.find((misc) => misc.id === props.misc.id);
  target.quantity = count;
};
</script>
