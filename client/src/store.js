import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userid: '',
    username: '',
    posts: []
  },
  mutations: {
    updatePosts: function (state, payload) {
      state.posts = payload
    },
    updateUserData: function (state, payload) {
      state.userid = payload.id
      state.username = payload.name
    }
  },
  actions: {
    fetchData: function (context, payload) {
      axios.get(`http://localhost:3000/posts`, {}).then((data) => {
        context.commit('updatePosts', data.data.data)
      })
    }
  }
})

export default store
