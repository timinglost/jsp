const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/'

Vue.component('good-card', {
  template: `<div class="good-card">
    <h2>{{ title }}</h2>
    <p>$ {{ price }}</p>
  </div>`,
  props: {
    title: String,
    price: Number
  }
})

Vue.component('goods-list', {
  template: `<div class="goods-list">
      <good-card 
      v-for="good of list" 
      v-bind:key="good.id_product" 
      v-bind:title="good.product_name"
      v-bind:price="good.price"></good-card>
    </div>`,
  props: {
    list: Array
  }
})

Vue.component('search', {
  template: `<div class="search">
    <input type="text" v-model="searhString" class="goods-search" />
    <button class="search-button" type="button" v-on:click="onClick">Искать</button>
  </div>`,
  data() {
    return {
      searhString: '',
    }
  },
  methods: {
    onClick() {
      this.$emit('search', this.searhString)
    }
  }
})

Vue.component('basket', {
  template: `<div class="basket-all">
              <button class="cart-button" type="button" v-on:click="showBasket">Корзина</button>
              <div class="basket" v-if="isVisibleCart">
                <div class="basket_top">
                  <div>Название товара</div>
                  <div>Количество</div>
                  <div>Цена за шт.</div>
                  <div>Итого</div>
                </div>
              </div>
            </div>`,
  data() {
    return {
      isVisibleCart: false,
    }
  },
  methods: {
    showBasket() {
      this.isVisibleCart = !this.isVisibleCart
    }
  }
})

new Vue({
  el: "#app",
  data: {
    goods: [],
    filteredGoods: [],
    searchLine: '',
  },
  methods: {
    loadGoods() {
      fetch(`${API_URL}catalogData.json`)
        .then((request) => request.json())
        .then((data) => {
          this.goods = data;
          this.filteredGoods = data;
        })
    },
    onSearch(searhString) {
      const regex = new RegExp(searhString, 'i');
      this.filteredGoods = this.goods.filter((good) => regex.test(good.product_name))
    },
  },
  mounted() {
    this.loadGoods();
  }
})