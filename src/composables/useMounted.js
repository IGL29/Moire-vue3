import { ref, onMounted, nextTick } from 'vue';

export default () => {
  const isMounted = ref(false);

  onMounted(() => {
    nextTick(() => {
      isMounted.value = true;
    });
  });

  return { isMounted };
};
