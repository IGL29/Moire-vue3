import axios from 'axios';
import API_BASE_URL from '@/config';

export default {
  // cart
  loadBasketData({ userAccessKey }) {
    return axios
      .get(`${API_BASE_URL}/api/baskets`, {
        params: {
          userAccessKey,
        },
      });
  },
  addProductToCart({
    userAccessKey,
    productId,
    colorId,
    sizeId,
    quantity,
  }) {
    return axios
      .post(`${API_BASE_URL}/api/baskets/products`, {
        productId,
        colorId,
        sizeId,
        quantity,
      }, {
        params: {
          userAccessKey,
        },
      });
  },
  changeQuantityProduct({ userAccessKey, basketItemId, quantity }) {
    return axios
      .put(`${API_BASE_URL}/api/baskets/products`, {
        basketItemId,
        quantity,
      }, {
        params: {
          userAccessKey,
        },
      });
  },
  deleteProduct({ userAccessKey, basketItemId }) {
    return axios
      .delete(`${API_BASE_URL}/api/baskets/products`, {
        data: {
          basketItemId,
        },
        params: {
          userAccessKey,
        },
      });
  },
  // products
  loadProductsData({
    page,
    limit,
    categoryId,
    materialIds,
    seasonIds,
    colorIds,
    minPrice,
    maxPrice,
  }) {
    return axios
      .get(`${API_BASE_URL}/api/products`, {
        params: {
          page,
          limit,
          categoryId,
          materialIds,
          seasonIds,
          colorIds,
          minPrice,
          maxPrice,
        },
      });
  },
  loadProductData({ slug }) {
    return axios
      .get(`${API_BASE_URL}/api/products/${slug}`);
  },
  // payments

  loadPayments({ deliveryTypeId }) {
    return axios
      .get(`${API_BASE_URL}/api/payments`, {
        params: {
          deliveryTypeId,
        },
      });
  },
  // deliveries
  loadDeliveries() {
    return axios
      .get(`${API_BASE_URL}/api/deliveries`);
  },
  // filters

  loadMaterialsData() {
    return axios
      .get(`${API_BASE_URL}/api/materials`);
  },
  loadSeasonsData() {
    return axios
      .get(`${API_BASE_URL}/api/seasons`);
  },
  loadCategoriesData() {
    return axios
      .get(`${API_BASE_URL}/api/productCategories`);
  },
  loadColorsData() {
    return axios
      .get(`${API_BASE_URL}/api/colors`);
  },
  // order

  postOrder({
    userAccessKey, name, address, phone, email, deliveryTypeId, paymentTypeId, comment,
  }) {
    return axios
      .post(`${API_BASE_URL}/api/orders`, {
        name,
        address,
        phone,
        email,
        deliveryTypeId,
        paymentTypeId,
        comment,
      },
      {
        params: {
          userAccessKey,
        },
      });
  },
  loadOrderInfo({ userAccessKey, id }) {
    return axios
      .get(`${API_BASE_URL}/api/orders/${id}`, {
        params: {
          userAccessKey,
        },
      });
  },
};
