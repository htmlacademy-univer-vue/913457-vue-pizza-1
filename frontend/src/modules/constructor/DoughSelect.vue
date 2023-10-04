<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          v-for="dough in types"
          :key="dough.id"
          class="dough__input dough__input--light"
        >
          <input
            class="visually-hidden"
            type="radio"
            name="dought"
            :value="dough.id"
            checked
          />
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
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
  types: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
.content__dough {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}
</style>
