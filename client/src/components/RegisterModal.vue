<template>
  <div class="modal fade" id="register-modal" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
          <div class="modal-header">
              <button type="button" class="close" id="closemodalregister" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">
                  <span class="glyphicon glyphicon-log-in"></span> Register new account</h4>
          </div>
          <div class="modal-body">
              <div class="form-group">
                  <label for="nameRegister">Name</label>
                  <input type="text" class="form-control" id="nameRegister">
              </div>
              <div class="form-group">
                  <label for="emailRegister">Email</label>
                  <input type="text" class="form-control" id="emailRegister">
              </div>
              <div class="form-group">
                  <label for="passwordRegister">Password</label>
                  <input type="password" class="form-control" id="passwordRegister">
              </div>
          </div>
          <div class="modal-footer text-centered">
              <button class="btn btn-info" @click="register">Register</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'
export default {
  name: 'RegisterModal',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    register: function () {
      let name = document.querySelector('#nameRegister').value
      let email = document.querySelector('#emailRegister').value
      let password = document.querySelector('#passwordRegister').value
      axios.post('http://localhost:3000/users/register', {
        name,
        email,
        password
      }).then((data) => {
        swal({
          text: 'Register Success',
          type: 'success'
        }).then(() => {
          document.querySelector('#closemodalregister').click()
        })
      })
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
