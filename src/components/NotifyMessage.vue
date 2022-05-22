<template>
  <Transition name="notify">
    <div v-if="isVisible" class="notify" @click="doHide">
      <p class="text">{{ text }}</p>
    </div>
  </Transition>
</template>

<script>
import { defineProps } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'NotifyMessage',
};
</script>

<script setup>
defineProps(['text', 'isVisible']);
const $store = useStore();

const doHide = () => {
  $store.commit('notify/clearTimerNotify');
};
</script>

<style scoped>
.notify-enter-active,
.notify-leave-active {
  transition: all 0.5s ease;
}

.notify-enter-from,
.notify-leave-to {
  transform: translateY(-10%);
  opacity: 0;
}
.text {
  user-select: none;
}
</style>
