<template>
<div class="catalog__error error">
    <div class="error__img"></div>
    <p class="error__text">Произошла ошибка при запросе</p>
    <button
      v-if="isShowButton"
      class="button button--second error__button"
      @click.prevent="repeatRequest">Повторить</button>
  </div>
</template>

<script>
import { defineEmits, defineProps } from 'vue';

export default {
  name: 'ErrorNotify',
};
</script>

<script setup>
defineProps({
  isShowButton: {
    type: Boolean,
    default() {
      return true;
    },
  },
});
const emits = defineEmits(['doRepeatRequest']);
const repeatRequest = () => emits('doRepeatRequest');
</script>
