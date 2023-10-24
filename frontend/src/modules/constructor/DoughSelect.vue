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
            :checked="modelValue === dough.id"
            :value="dough.id"
            @input="emit('update:modelValue', +$event.target.value)"
          />
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["update:modelValue"]);

defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  types: {
    type: Array,
    default: () => [],
  },
});
</script>
