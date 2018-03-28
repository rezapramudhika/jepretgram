<template>
  <div class="modal fade" id="post-modal" role="dialog">
    <div class="modal-dialog">
      <div class="modal-content">
          <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4>Post new item</h4>
          </div>
          <div class="modal-body">
              <div class="form-group">
                  <label for="itemImage">Image</label>
                  <input type="file" class="form-control-file" id="itemImage" @change="onFileChange">
              </div>
              <div class="form-group">
                  <label for="caption">Caption</label>
                  <input type="text" class="form-control" id="caption">
              </div>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click='addItem'>Submit</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'PostModal',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    onFileChange: function (e) {
      const files = e.target.files || e.dataTransfer.files
      this.fileUpload = files
    },
    addItem: function () {
      const request = axios.create({
        baseURL: 'http://localhost:3000',
        headers: { 'token': localStorage.getItem('token') }
      })
      let caption = document.querySelector('#caption').value
      let send = new FormData()
      send.append('image', this.fileUpload[0])
      send.append('caption', caption)
      request.post('/posts', send).then((data) => {
        alert('New item added')
        this.$router.go()
      }).catch(err => {
        console.log(err)
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
