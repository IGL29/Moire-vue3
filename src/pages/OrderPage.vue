<template>
  <main class="content container">
    <div class="content__top">
      <BreadCrumbs
        :routePages="[
          { name: 'main', title: 'Каталог' },
          { name: 'cart', title: 'Корзина' }
        ]"
        currentNamePageText="Оформление заказа"
      />

      <div class="content__row">
        <h1 class="content__title">
          Оформление заказа
        </h1>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="doPostOrder">
        <div class="cart__field">
          <div class="cart__data">
            <FormField
              formElement="input"
              label="ФИО"
              type="text"
              placeholder="Иванова Анастасия Ивановна"
              v-model="formData.name"
              :errorText="formErrors.name"
            />

            <FormField
              formElement="input"
              label="Адрес доставки"
              type="text"
              placeholder="Город, улица, дом, номер квартиры"
              v-model="formData.address"
              :errorText="formErrors.address"
            />

            <FormField
              formElement="input"
              label="Телефон"
              type="tel"
              placeholder="+79876543210"
              v-model="formData.phone"
              :errorText="formErrors.phone"
            />

            <FormField
              formElement="input"
              label="Email"
              type="email"
              placeholder="ivanova@email.ru"
              v-model="formData.email"
              :errorText="formErrors.email"
            />

            <FormField
              formElement="textaria"
              label="Комментарий к заказу"
              placeholder="Ваши пожелания"
              v-model="formData.comment"
              :errorText="formErrors.comment"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item" v-for="delivery of deliveries" :key="delivery.id">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    :value="delivery.id"
                    v-model="deliveryTypeId"
                  />
                  <span class="options__value">
                    {{ delivery.title }}
                    <b> {{ formatPriceDelivery(delivery.price) }} </b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item" v-for="payment of payments" :key="payment.id">
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    :value="payment.id"
                    v-model="paymentTypeId"
                  />
                  <span class="options__value">
                    {{ payment.title }}
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <CartProductsInfo
          :products="products"
          :numberProducts="numberProducts"
          :totalNumberProducts="totalNumberProducts"
          :totalPrice="totalPrice"
          :deliveryPrice="formatPriceDelivery(priceSelectedDelivery)"
        >
          <BaseButton text="Оформить заказ" />
        </CartProductsInfo>

        <ErrorOrder v-if="errorMessage" :errorMessage="errorMessage"/>
      </form>
    </section>
  </main>
</template>

<script>
import {
  ref, computed, watch,
} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import FormField from '@/components/FormField.vue';
import CartProductsInfo from '@/components/CartProductsInfo.vue';
import ErrorOrder from '@/components/ErrorOrder.vue';
import BaseButton from '@/components/BaseButton.vue';

export default {
  name: 'OrderPage',
};
</script>

<script setup>
const $store = useStore();
const $router = useRouter();

const products = computed(() => $store.getters['cart/productsInCart']);
const numberProducts = computed(() => $store.getters['order/orderNumberProducts']);
const totalNumberProducts = computed(() => $store.getters['order/totalOrderNumberProducts']);

const deliveryTypeId = ref('');

const totalPriceCart = computed(() => $store.getters['cart/totalPriceCart']);
const deliveries = computed(() => $store.getters['deliveries/deliveries']);
const priceSelectedDelivery = computed(() => {
  let price = null;
  if (deliveryTypeId.value) {
    price = deliveries.value.find((delivery) => (
      Number(delivery.id) === Number(deliveryTypeId.value)
    )).price;
  }
  return price;
});
const totalPrice = computed(
  () => Number(totalPriceCart.value) + Number(priceSelectedDelivery.value),
);

const formatPriceDelivery = (price) => {
  if (Number(price) === 0) {
    return 'бесплатно';
  }
  return `${price} ₽`;
};

const setDefaultDelivery = () => {
  if (deliveries.value[0].id) {
    deliveryTypeId.value = deliveries.value[0].id;
  }
};
watch(deliveries, () => setDefaultDelivery());

const loadPayments = () => {
  $store.dispatch('payments/loadPayments', deliveryTypeId.value);
};
watch(deliveryTypeId, () => loadPayments());

const errorMessage = ref('');
const payments = computed(() => $store.getters['payments/payments']);
const paymentTypeId = ref('');
const setDefaultPayments = () => {
  if (payments.value[0].id) {
    paymentTypeId.value = payments.value[0].id;
  }
};
watch(payments, () => setDefaultPayments());

const formData = ref({});
const formErrors = ref({});
const doPostOrder = () => {
  formErrors.value = {};
  $store.dispatch('order/postOrder', {
    ...formData.value,
    deliveryTypeId: deliveryTypeId.value,
    paymentTypeId: paymentTypeId.value,
  })
    .then((response) => {
      $store.commit('cart/resetCart');
      $router.push({ name: 'order-info', params: { id: response.data.id } });
    })
    .catch((error) => {
      if (error.response) {
        errorMessage.value = error.response.data.error.message;
        formErrors.value = error.response.data.error.request || {};
      } else if (error.request) {
        errorMessage.value = 'Сервер не отвечает. Обновите страницу или попробуйте позднее.';
      } else {
        errorMessage.value = 'Произошла ошибка при запросе на сервер.';
      }
    });
};

const loadDeliveries = () => {
  $store.dispatch('deliveries/loadDeliveries');
};
loadDeliveries();
</script>
