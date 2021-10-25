const API_URL = 'http://localhost:3000/'

Vue.component('good-card', {
  template: `<div class="good-card" @click="onClick">
    <h2>{{ title }}</h2>
    <p>$ {{ price }}</p>
  </div>`,
  props: {
    title: String,
    price: Number
  },
  methods: {
    onClick() {
      fetch(API_URL + "addToCart", {
        method: "POST",
        headers: {
          'Content-Type': 'application/JSON'
        },
        body: JSON.stringify({ product_name: this.title, price: this.price })
      })
    }
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
                <basket-card 
                v-for="good of list" 
                v-bind:key="good.id_product" 
                v-bind:title="good.product_name"
                v-bind:price="good.price"></basket-card>
              </div>
            </div>`,
  props: {
    list: Array
  },
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
});
Vue.component('basket-card', {
  template: `<div class="basket-card">
    <h2>{{ title }}</h2>
    <p>$ {{ price }}</p>
  </div>`,
  props: {
    title: String,
    price: Number
  },
})

new Vue({
  el: "#app",
  data: {
    goods: [],
    filteredGoods: [],
    searchLine: '',
    goods_b: []
  },
  methods: {
    loadGoods() {
      fetch(`${API_URL}catalogData`)
        .then((request) => request.json())
        .then((data) => {
          this.goods = data;
          this.filteredGoods = data;
        })
    },
    loadBasket() {
      fetch(`${API_URL}catalogBasket`)
        .then((request) => request.json())
        .then((data) => {
          this.goods_b = data;
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