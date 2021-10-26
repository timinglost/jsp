<template>
  <div>
    <header class="header-top">
      <Search v-on:search="onSearch"></Search>
      <button class="b-cart" v-on:click="goToCart">Basket</button>
    </header>
    <main>
      <GoodsList></GoodsList>
    </main>
  </div>
</template>

<script>
import Search from "../components/Search.vue";
import GoodsList from "../components/GoodsList.vue";
export default {
  components: {
    Search,
    GoodsList,
  },
  data() {
    return {
      searchLine: "",
      goods_b: [],
    };
  },
  computed: {
    filteredGoods() {
      return this.$store.getters.getGoods;
    },
  },
  methods: {
    loadBasket() {
      fetch(`${API_URL}catalogBasket`)
        .then((request) => request.json())
        .then((data) => {
          this.goods_b = data;
        });
    },
    onSearch(searhString) {
      this.$store.dispatch("filter", searhString);
    },
    goToCart() {
      this.$router.push("/cart");
    },
  },
  mounted() {
    this.$store.dispatch("loadGoods");
  },
};
</script>

<style lang="scss">
.b-cart {
  font-size: 15px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.04em;
  color: #ffffff;
  background: #5a98d0;
  border: none;
  border-radius: 10px;
}
.header-top {
  max-width: 1140px;
  margin: 0 auto;
  text-align: right;
}
</style>
