<template>
  <div class="good-card" @click="onClick">
    <h2>{{ title }}</h2>
    <p>$ {{ price }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    price: Number,
  },
  methods: {
    onClick() {
      this.$store.dispatch("addToCart", {
        product_name: this.title,
        price: this.price,
      });
    },
  },
};
</script>