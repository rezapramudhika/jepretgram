const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    register: (req, res) => {
        let salt = bcrypt.genSaltSync(saltRounds);
        let hash = bcrypt.hashSync(req.body.password, salt);
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash
        }, (err, user) => {
            if (err) {
                return res.status(400).json({
                    message: err
                })
            }
            res.status(200).json({
                message: 'User registered',
                data: user
            })
        })
    },
    loginFB: (req, res) => {
        const facebookId = req.body.facebookId;
        const email = req.body.email;
        const name = req.body.name;
        const imgUrl = req.body.imgUrl;

        User.findOne({ 'email': email })
            .then(user => {
                if (user) {
                    const token = jwt.sign({ email: user.email, id: user._id, name: user.name }, process.env.SECRET_KEY)
                    res.status(200).json({
                        message: 'Signin success',
                        token,
                        user: {
                            id: user.id,
                            email: user.email,
                            name: user.name
                        }
                    })
                } else {
                    const newUser = new User({
                        facebookId,
                        email,
                        name
                    })
                    newUser.save((err, data) => {
                        console.log(data);
                        const token = jwt.sign({ email: data.email, id: data._id, name: data.name}, process.env.SECRET_KEY);
                        res.status(200).json({
                            message: 'Signin success',
                            token,
                            user: {
                                id: data.id,
                                email: data.email,
                                name: data.name
                            }
                        })
                    })
                }
            })
    },
    login(req, res) {
        User.findOne({ 'email': req.body.email })
            .then(data => {
                if (data) {
                    let check = bcrypt.compareSync(req.body.password, data.password);
                    if (check) {
                        var token = jwt.sign({ email: data.email, id: data._id, name: data.name}, process.env.SECRET_KEY);
                        res.status(200).json({
                            message: 'Signin success',
                            token,
                            user: {
                                id: data.id,
                                email: data.email,
                                name: data.name
                            }
                        })
                    }
                } else {
                    res.status(404).json({
                        message: 'user not found'
                    })
                }
            })
    }
}