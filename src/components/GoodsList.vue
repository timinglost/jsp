<template>
  <div class="goods-list">
    <GoodCard
      class="GCS"
      v-for="good of list"
      v-bind:key="good.id_product"
      v-bind:title="good.product_name"
      v-bind:price="good.price"
    ></GoodCard>
  </div>
</template>

<script>
import GoodCard from "./GoodCard.vue";
export default {
  components: { GoodCard },
  computed: {
    list() {
      return this.$store.getters.getGoods;
    },
  },
};
</script>

<style lang="scss">
.GCS {
  width: 359px;
  padding: 44px 32px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: rgb(151, 172, 147);
  display: flex;
  flex-direction: column;
  margin-left: 30px;
}
.goods-list {
  display: flex;
  flex-direction: row;
  padding-top: 30px;
}
</style>