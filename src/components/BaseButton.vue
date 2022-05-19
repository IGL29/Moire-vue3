<template>
  <button class="cart__button button button--primery" type="submit">
    <template v-if="text">
      {{ text }}
    </template>
    <slot />
  </button>
</template>

<script>
import { defineProps } from 'vue';

export default {
  name: 'BaseButton',
};
</script>

<script setup>
defineProps(['text']);
</script>
