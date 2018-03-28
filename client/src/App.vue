<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
    <login-modal></login-modal>
    <register-modal></register-modal>
    <post-modal></post-modal>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import LoginModal from './components/LoginModal.vue'
import RegisterModal from './components/RegisterModal.vue'
import PostModal from './components/PostModal.vue'
export default {
  name: 'App',
  components: {
    Navbar,
    LoginModal,
    RegisterModal,
    PostModal
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
