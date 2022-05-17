<template>
  <ul class="breadcrumbs">
    <li class="breadcrumbs__item" v-for="(routePage, index) of routePages" :key="index">
      <router-link class="breadcrumbs__link" :to="{ name: routePage.name }">
        {{ routePage.title }}
      </router-link>
    </li>

    <li class="breadcrumbs__item">
      <a class="breadcrumbs__link">
        {{ currentNamePageText }}
      </a>
    </li>
  </ul>
</template>

<script>
import { defineProps } from 'vue';

export default {
  name: 'BreadCrumbs',
};
</script>

<script setup>
defineProps(['routePages', 'currentNamePageText']);
</script>
