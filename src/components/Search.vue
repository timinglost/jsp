<template>
  <div class="search">
    <input type="text" v-model="searhString" class="goods-search" />
    <button class="search-button" type="button" v-on:click="onClick">
      Искать
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searhString: "",
    };
  },
  methods: {
    onClick() {
      this.$emit("search", this.searhString);
    },
  },
};
</script>

<style lang="scss">
.search-button {
  font-size: 15px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.04em;
  color: #ffffff;
  background: #5a98d0;
  border: none;
  border-radius: 10px;
}
.goods-search {
  border-radius: 10px;
}
</style>