<template>
  <input
    class="visually-hidden"
    type="radio"
    name="dought"
    :checked="modelValue.id === dough.id"
    :value="dough.id"
    @input="emit('update:modelValue', dough)"
  />
  <b>{{ dough.name }}</b>
  <span>{{ dough.description }}</span>
</template>

<script setup>
const emit = defineEmits(["update:modelValue"]);

defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  dough: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang="scss">
.content__dough {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}
</style>
