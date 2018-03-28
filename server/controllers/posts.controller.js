const Post = require('../models/posts.model');
const User = require('../models/users.model');

module.exports = {
    create: (req, res) => {
        req.body.imgUrl = req.file.cloudStoragePublicUrl;
        req.body.user = req.decoded.id;
        Post.create(req.body, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    message: err.message
                })
            }
            res.status(200).json({
                message: 'New Post inserted',
                data
            })
        })
    },
    findAll: (req, res) => {
        Post.find()
            .populate('user')
            .exec()
            .then((data) => {
                res.status(200).json({
                    message: 'Success get all data !',
                    data
                })
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({
                    message: err.message
                })
            })
    },
    findById: (req, res) => {
        Post.findOne({
            _id: req.params.id
        })
            .populate('user')
            .exec()
            .then((data) => {
                res.status(200).json({
                    message: 'Success get data !',
                    data
                })
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({
                    message: err.message
                })
            })
    },
    update: (req, res) => {
        Post.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    message: err.message
                })
            }
            res.status(200).json({
                message: 'Post updated',
                data
            })
        })
    },
    like: (req, res) => {
        Post.findOne({
            _id: req.params.id
        })
            .then((response) => {
                const check = response.likes.filter((like) => { return like == req.decoded.id });
                if (check.length > 0) {
                    response.likes.splice(response.likes.indexOf(req.decoded.id), 1);
                    Post.updateOne({
                        _id: req.params.id
                    }, {
                            likes: response.likes
                        }).then((like) => {
                            res.status(200).json({
                                message: 'Success get data',
                                like
                            })
                        });
                } else {
                    response.likes.push(req.decoded.id);
                    Post.updateOne({
                        _id: req.params.id
                    }, {
                            likes: response.likes
                        }).then((like) => {
                            res.status(200).json({
                                message: 'Success get data',
                                like
                            })
                        });
                }
            }).catch((err) => {
                console.log(err);
                res.status(500).json({
                    message: err.message
                })
            });
    },
    destroy: (req, res) => {
        Post.remove({ _id: req.params.id }, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    message: err.message
                })
            }
            res.status(200).json({
                message: 'Post deleted',
            })
        })
    }
}
