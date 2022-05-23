<template>
<div class="item__desc">
  <ul class="tabs">
    <li class="tabs__item" v-for="tab of tabs" :key="tab.name">
      <a
        class="tabs__link"
        :class="{ 'tabs__link--current': currentTab === tab.name }"
        @click.prevent="currentTab = tab.name"
      >
        {{ tab.title }}
      </a>
    </li>
  </ul>
  <div class="item__content">
    <Transition name="fade" mode="out-in">
      <component :is="currentTabComponent" />
    </Transition>
  </div>
</div>
</template>

<script>
import {
  ref, computed, defineAsyncComponent, h,
} from 'vue';
import LoaderElement from '@/components/LoaderElement.vue';
import ErrorNotify from '@/components/ErrorNotify.vue';

export default {
  name: 'AboutProductsTabs',
};
</script>

<script setup>
const currentTab = ref('description');
const isError = ref(false);
const tabs = [
  {
    name: 'description',
    title: 'Информация о товаре',
    component: defineAsyncComponent(() => import('@/components/ProductDescription.vue')),
  },
  {
    name: 'delivery',
    title: 'Доставка и возврат',
    component: defineAsyncComponent({
      loader: () => import('@/components/ProductDeliveryInfo.vue'),
      loadingComponent: LoaderElement,
      delay: 0,
      errorComponent: () => h(ErrorNotify, {
        isShowButton: false,
      }),
      onError(err, retry, fail, attempts) {
        if (attempts <= 3) {
          retry();
        } else {
          isError.value = true;
          fail();
        }
      },
    }),
  },
];

const currentTabComponent = computed(
  () => tabs.find((tab) => tab.name === currentTab.value).component,
);
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
