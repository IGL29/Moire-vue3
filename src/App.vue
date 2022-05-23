<template>
  <div class="wrapper">
    <TheHeader />
      <router-view v-slot="{ Component }" :key="$route.fullPath">
        <transition name="page" mode="out-in" appear>
          <component :is="Component"></component>
        </transition>
      </router-view>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';

export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter,
  },

  created() {
    if (!localStorage.getItem('user')) {
      this.$store.dispatch('createUser');
    }
    this.$store.commit('saveAccessKey');
    this.$store.dispatch('cart/loadBasketData');
  },
};
</script>

<style>
.page-leave-active,
.page-enter-active {
  transition: all 0.5s ease-out;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
