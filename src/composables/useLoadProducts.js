import { ref } from 'vue';
import { useStore } from 'vuex';

export default () => {
  const $store = useStore();

  const isLoading = ref(false);
  const isError = ref(false);

  const fetchProducts = () => {
    isLoading.value = true;
    isError.value = false;

    $store.dispatch('products/loadProductsData')
      .then(() => {
        isLoading.value = false;
      }).catch(() => {
        isLoading.value = false;
        isError.value = true;
      });
  };

  return {
    fetchProducts,
    isLoading,
    isError,
  };
};
