import { ref, computed } from 'vue';

export default () => {
  const isLoad = ref(false);
  const isLoadError = ref(false);
  const isWasSuccessfullLoaded = ref(false);
  const isNextLoad = computed(() => isWasSuccessfullLoaded.value);

  const doSetLoaded = () => {
    isWasSuccessfullLoaded.value = true;
    isLoad.value = true;
  };
  const doSetLoadError = () => {
    isWasSuccessfullLoaded.value = false;
    isLoadError.value = true;
  };

  const doSetStartLoading = () => {
    isLoad.value = false;
    isLoadError.value = false;
  };

  return {
    isLoad,
    isNextLoad,
    isLoadError,
    doSetLoaded,
    doSetLoadError,
    doSetStartLoading,
  };
};
