const express = require('express');
const router = express.Router();
const { create, findAll, findById, update, like, destroy } = require('../controllers/posts.controller');
const {sendUploadToGCS} = require('../middlewares/uploadGCS')
const memUpload = require('../middlewares/multer')
const { authLogin } = require('../middlewares/auth')

/* GET users listing. */
router.post('/', authLogin, memUpload.single('image'), sendUploadToGCS, create);
router.get('/', findAll)
router.get('/:id', findById)
router.put('/:id', authLogin, update);
router.post('/like/:id', authLogin, like);
router.delete('/:id', authLogin, destroy);

module.exports = router;
