<template>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
                aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <router-link :to="{path:'/'}"><a class="navbar-brand" href="#">Jepretgram</a></router-link>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right">
                <li>
                    <a class="pointer" href="#" data-toggle="modal" id="loginbtn" data-target="#login-modal" v-if="name == null"><span class="glyphicon glyphicon-log-out"></span> Login / Register</a>
                </li>
                <li>
                    <a class="pointer" href="#" data-toggle="modal" data-target="#post-modal" v-if="name !== null">Post a photo</a>
                </li>
                <li>
                    <a class="pointer" href="#"  v-if="name !== null">Hello, {{name}}</a>
                </li>
                <li>
                    <a class="pointer" href="#"  v-if="name !== null" @click="logout">Logout</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      id: '',
      name: ''
    }
  },
  methods: {
    logout: function () {
      localStorage.removeItem('userid')
      localStorage.removeItem('username')
      this.$router.go()
    }
  },
  mounted () {
    this.id = localStorage.getItem('userid')
    this.name = localStorage.getItem('username')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .pointer:hover {
      cursor: pointer;
  }
</style>
