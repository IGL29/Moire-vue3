import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default () => {
  const isLoading = ref(false);
  const isError = ref(false);
  const $store = useStore();
  const $route = useRoute();

  const fetchProduct = () => {
    isLoading.value = true;
    isError.value = false;

    const { slug } = $route.params;
    $store
      .dispatch('products/loadProductData', { slug })
      .then(() => {
        isLoading.value = false;
        isError.value = false;
      })
      .catch(() => {
        isLoading.value = false;
        isError.value = true;
      });
  };

  return {
    fetchProduct,
    isLoading,
    isError,
  };
};
