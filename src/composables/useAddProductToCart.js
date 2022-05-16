import { ref } from 'vue';
import { useStore } from 'vuex';

export default () => {
  const $store = useStore();
  const isLoading = ref(false);

  async function postProductToCart({
    productId, colorId, sizeId, quantity = 1,
  }) {
    isLoading.value = true;

    $store.dispatch('addProductToCart', {
      productId,
      colorId,
      sizeId,
      quantity,
    })
      .then(() => {
        isLoading.value = false;
        $store.commit('showNotifySuccess');
      })
      .catch(() => {
        isLoading.value = false;
        $store.commit('showNotifyError');
      });
  }

  return { isLoading, postProductToCart };
};
