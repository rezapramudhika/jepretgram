<template>
    <div class="container">
        <div class="thumbnail thumbnail-decoration" v-for="(item, index) in data" :key="index">
            <img :src="item.imageUrl" style="min-width: 144px; min-height: 144px">
            <div class="caption">
                <h4><strong>{{item.user.name}}</strong></h4>
                <p>{{item.caption}}</p>
            </div>
            <button class="btn btn-info" @click="like(item._id)">Like <span>{{item.likes.length}}</span></button>
            <button class="btn btn-warning" @click="edit(item._id)" v-if="item.user._id === id">Edit</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
  data () {
    return {
      id: ''
    }
  },
  created: function () {
    if (localStorage.getItem('userid') !== null) {
      if (localStorage.getItem('username') !== null) {
        this.$store.commit('updateUserData', {
          id: localStorage.getItem('userid'),
          name: localStorage.getItem('username')
        })
        this.id = localStorage.getItem('userid')
      }
    }
    this.$store.dispatch('fetchData')
  },
  computed: {
    data () {
      return this.$store.state.posts
    }
  },
  methods: {
    like (id) {
      if (localStorage.getItem('userid') !== null) {
        const request = axios.create({
          baseURL: 'http://localhost:3000',
          headers: { 'token': localStorage.getItem('token') }
        })
        request.post(`/posts/like/${id}`).then((data) => {
          this.$router.go()
        }).catch(err => {
          console.log(err)
        })
      } else {
        document.querySelector('#loginbtn').click()
      }
    },
    edit () {
      alert('Belum slesai')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .panel-body {
        text-align: left;
        cursor: pointer;
    }
    ul {
    -webkit-padding-start: 0px;
    }
</style>
