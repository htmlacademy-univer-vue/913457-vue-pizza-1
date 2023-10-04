<template>
  <AppDrop @drop="test">
    <div class="content__constructor">
      <div class="pizza pizza--foundation--big-tomato">
        <div class="pizza__wrapper">
          <div class="pizza__filling pizza__filling--ananas"></div>
          <div class="pizza__filling pizza__filling--bacon"></div>
          <div class="pizza__filling pizza__filling--cheddar"></div>
        </div>
      </div>
    </div>
  </AppDrop>
</template>

<script setup>
import { defineProps } from "vue";
import AppDrop from "@/common/components/AppDrop.vue";

defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.content__constructor {
  width: 315px;
  margin-top: 25px;
  margin-right: auto;
  margin-left: auto;
}
</style>
