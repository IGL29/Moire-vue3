<template>
<div class="cart__error form__error-block">
  <h4>Заявка не отправлена!</h4>
  <p>
    {{ errorMessage }}
  </p>
</div>
</template>

<script>
import { defineProps } from 'vue';

export default {
  name: 'ErrorOrder',
};
</script>

<script setup>
defineProps(['errorMessage']);
</script>
