<template>
  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': !allowedGoToPrevPage}"
        aria-label="Предыдущая страница"
        @click.prevent="goToPrevPage"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item" v-for="page of numberPages" :key="page">
      <a
        class="pagination__link"
        :class="{ 'pagination__link--current': addClassActivePage(page) }"
        @click.prevent="goToPage(page)"
      >
        {{ page }}
      </a>
    </li>

    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': !allowedGoToNextPage }"
        href="#"
        aria-label="Следующая страница"
        @click.prevent="goToNextPage"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'ProductsPagination',
};
</script>

<script setup>
const $store = useStore();

const currentPage = computed(() => $store.getters['page/currentPage']);

const addClassActivePage = (page) => page === currentPage.value;

const goToPage = (page) => {
  $store.commit('page/updateCurrentPage', page);
  $store.dispatch('products/loadProductsData');
};

const numberPages = computed(() => $store.getters['page/numberPages']);
const allowedGoToNextPage = computed(() => numberPages.value > currentPage.value);
const goToNextPage = () => {
  if (allowedGoToNextPage.value) {
    $store.commit('page/updateCurrentPage', currentPage.value + 1);
    $store.dispatch('products/loadProductsData');
  }
};

const allowedGoToPrevPage = computed(() => currentPage.value > 1);
const goToPrevPage = () => {
  if (allowedGoToPrevPage.value) {
    $store.commit('page/updateCurrentPage', currentPage.value - 1);
    $store.dispatch('products/loadProductsData');
  }
};
</script>
