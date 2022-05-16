<template>
  <Transition name="notify">
    <div class="notify">
      <p>{{ text }}</p>
    </div>
  </Transition>
</template>

<script>
import { defineProps } from 'vue';

export default {
  name: 'NotifyMessage',
};
</script>

<script setup>
defineProps(['text']);
</script>

<style>
.notify-enter-active,
.notify-leave-active {
  transition: opacity 0.5s ease;
}

.notify-enter-from,
.notify-leave-to {
  opacity: 0;
}
</style>
