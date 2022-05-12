<template>
  <input class="form__input" :type="type" :placeholder="placeholder" v-model="dataInput"/>
</template>

<script>
export default {
  name: 'FieldInput',

  props: ['placeholder', 'type', 'modalValue'],

  computed: {
    dataInput: {
      get() {
        return this.modalValue;
      },
      set(value) {
        this.$emit('update:modalValue', value);
      },
    },
  },
};
</script>
