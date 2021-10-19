const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/'


new Vue({
  el: "#app",
  data: {
    goods: [],
    filteredGoods: [],
    searchLine: '',
    isVisibleCart: false
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
    FilterGoods() {
      let text = this.searchLine.toLowerCase().trim();

      if (text === '') {
        this.filteredGoods = this.goods;
      } else {
        this.filteredGoods = this.goods.filter((el) => {
          return el.product_name.toLowerCase().includes(text);
        });
      }
    },
    showBasket() {
      if (this.isVisibleCart == false) {
        this.isVisibleCart = true
      } else {
        this.isVisibleCart = false
      }
    }
  },
  mounted() {
    this.loadGoods();
  }
})