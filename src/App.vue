<template>
  <div class="wrapper">
    <TheHeader />
    <router-view :key="$route.fullPath"/>
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
    this.$store.dispatch('loadBasketData');
  },
};
</script>

<style>

</style>
