const express = require('express');
const router = express.Router();
const { create, findAll, findById, update, like, destroy } = require('../controllers/posts.controller');

/* GET users listing. */
router.post('/', create);
router.get('/', findAll)
router.get('/:id', findById)
router.put('/:id', update);
router.post('/like/:id', like);
router.delete('/:id', destroy);

module.exports = router;
