import { createRouter, createWebHashHistory } from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import CartPage from '@/pages/CartPage.vue';
import OrderPage from '@/pages/OrderPage.vue';
import OrderInfoPage from '@/pages/OrderInfoPage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import config from '../../vue.config';

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainPage,
  },
  {
    path: '/product/:slug/:color',
    name: 'product',
    component: ProductPage,
  },
  {
    path: '/cart/',
    name: 'cart',
    component: CartPage,
  },
  {
    path: '/order/',
    name: 'order',
    component: OrderPage,
  },
  {
    path: '/order-info/:id',
    name: 'order-info',
    component: OrderInfoPage,
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFoundPage',
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(config.publicPath),
  routes,
});

export default router;
