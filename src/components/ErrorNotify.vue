<template>
<div class="catalog__error error">
    <div class="error__img"></div>
    <p class="error__text">Произошла ошибка при запросе</p>
    <button
      class="button button--second error__button"
      @click.prevent="repeatRequest">Повторить</button>
  </div>
</template>

<script>
import { defineEmits } from 'vue';

export default {
  name: 'ErrorNotify',
};
</script>

<script setup>
const emits = defineEmits(['doRepeatRequest']);
const repeatRequest = () => emits('doRepeatRequest');
</script>
