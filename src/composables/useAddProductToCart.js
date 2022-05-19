import { ref } from 'vue';
import { useStore } from 'vuex';

export default () => {
  const $store = useStore();
  const isLoading = ref(false);

  function postProductToCart({
    productId, colorId, sizeId, quantity = 1,
  }) {
    isLoading.value = true;

    return $store.dispatch('cart/addProductToCart', {
      productId,
      colorId,
      sizeId,
      quantity,
    })
      .then(() => {
        isLoading.value = false;
        $store.commit('notify/showNotifySuccess');
      })
      .catch(() => {
        isLoading.value = false;
        $store.commit('notify/showNotifyError');
      });
  }

  return { isLoading, postProductToCart };
};
