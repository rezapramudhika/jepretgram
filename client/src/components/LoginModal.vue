<template>
  <div class="modal fade" id="login-modal" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
          <div class="modal-header">
              <button type="button" class="close" id="closemodallogin" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">
                  <span class="glyphicon glyphicon-log-in"></span> Login to your account</h4>
          </div>
          <div class="modal-body">
              <div class="form-group">
                  <label for="emailLogin">Email</label>
                  <input type="text" class="form-control" id="emailLogin">
              </div>
              <div class="form-group">
                  <label for="passwordLogin">Password</label>
                  <input type="password" class="form-control" id="passwordLogin">
              </div>
          </div>
          <div class="modal-footer text-centered">
              <button class="btn btn-info" @click="login">Login</button>
              <p class="text-centered">New member?
                  <a href="#" data-toggle="modal" data-target="#register-modal">Register</a> here</p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'
export default {
  name: 'LoginModal',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    login: function () {
      let email = document.querySelector('#emailLogin').value
      let password = document.querySelector('#passwordLogin').value
      axios.post('http://localhost:3000/users/login', {
        name,
        email,
        password
      }).then((response) => {
        swal({
          text: 'Welcome back, ' + response.data.user.name,
          type: 'success'
        }).then(() => {
          localStorage.setItem('userid', response.data.user.id)
          localStorage.setItem('username', response.data.user.name)
          localStorage.setItem('token', response.data.token)
          this.$router.go()
        })
      })
    },
    updateUserData: function (user) {
      // console.log(user)
      this.$store.commit('updateUserData', user)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  * {
      text-align: justify;
  }
  .text-centered {
    text-align: center;
  }
</style>
