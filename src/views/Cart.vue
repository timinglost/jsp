<template>
  <div class="all-cart">
    <h2 class="item-cart" v-bind:key="good.id" v-for="good of cart">
      {{ good.product_name }}
    </h2>
  </div>
</template>

<script>
export default {
  computed: {
    cart() {
      return this.$store.getters.getCart;
    },
  },
};
</script>
<style lang="scss">
.all-cart {
  max-width: 1140px;
  margin: 0 auto;
}
.item-cart {
  width: 359px;
  padding: 44px 32px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: rgb(151, 172, 147);
  display: flex;
  flex-direction: column;
  margin-left: 30px;
}
</style>