import Vue from 'vue'
import Vuex from 'vuex'
const API_URL = "http://localhost:8080/";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    goods: [],
    filteredGoods: [],
    cart: []
  },
  getters: {
    getGoods: (state) => state.filteredGoods,
    getCart: (state) => state.cart
  },
  mutations: {
    addGood: (state, good) => {
      state.cart.push(good)
    },
    setGoods: (state, goods) => {
      state.goods = goods
      state.filteredGoods = goods
    },
    setFiltred: (state, filteredGoods) => {
      state.filteredGoods = filteredGoods
    }
  },
  actions: {
    loadGoods({ commit }) {
      return fetch(`${API_URL}catalogData`)
        .then((request) => request.json())
        .then((data) => {
          commit('setGoods', data)
          return data
        });
    },
    addToCart({ commit }, good) {
      fetch(API_URL + "addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify(good),
      }).then(() => {
        commit('addGood', good)
      })
    },
    filter({ commit, state }, searhString) {
      const regex = new RegExp(searhString, "i");
      commit('setFiltred', state.goods.filter((good) =>
        regex.test(good.product_name)
      ))
    }
  }
})
