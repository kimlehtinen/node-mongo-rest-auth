const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

router.post('/signup', (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'Email already exists',
        });
      }
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        }
        const newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          email: req.body.email,
          password: hash,
        });
        newUser.save().then(() => {
          res.status(201).json({
            message: 'New user created successfully',
          });
        }).catch((newUserError) => {
          res.status(500).json({
            error: newUserError,
          });
        });
        return false;
      });
      return false;
    });
});

router.post('/login', (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Authentication failed',
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Authentication failed',
          });
        }
        if (result) {
          const jwtToken = jwt.sign(
            {
              email: user[0].email,
              /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
              userId: user[0]._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: '1h',
            },
          );
          return res.status(200).json({
            message: 'Authentication successful',
            jwtToken,
          });
        }
        res.status(401).json({
          message: 'Authentication failed',
        });
        return false;
      });
      return false;
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.delete('/:user_id', (req, res) => {
  User.remove({ _id: req.params.user_id }).exec().then(() => {
    res.status(200).json({
      message: 'User was successfully deleted',
    });
  })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
