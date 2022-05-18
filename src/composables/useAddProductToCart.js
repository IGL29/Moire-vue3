import { ref } from 'vue';
import { useStore } from 'vuex';

export default () => {
  const $store = useStore();
  const isLoading = ref(false);

  function postProductToCart({
    productId, colorId, sizeId, quantity = 1,
  }) {
    isLoading.value = true;

    return $store.dispatch('addProductToCart', {
      productId,
      colorId,
      sizeId,
      quantity,
    })
      .then(() => {
        isLoading.value = false;
        $store.commit('showNotifySuccess');
      })
      .catch((err) => {
        isLoading.value = false;
        $store.commit('showNotifyError');
        console.log(err.response.data.error.request);
      });
  }

  return { isLoading, postProductToCart };
};
