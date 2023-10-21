<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in sizes"
          :key="size.id"
          class="diameter__input diameter__input--small"
        >
          <input
            class="visually-hidden"
            type="radio"
            name="diameter"
            :value="size.id"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  sizes: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
.content__diameter {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
