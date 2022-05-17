<template>
  <span class="form__error">{{ error }}</span>
</template>

<script>
import { defineProps } from 'vue';

export default {
  name: 'ErrorField',
};
</script>

<script setup>
defineProps(['error']);
</script>
