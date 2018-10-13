const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.post("/signup", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Email already exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const newUser = new User({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              password: hash
            });
            newUser.save().then(result => {
                console.log('New user result: ', result);
                res.status(201).json({
                  message: "New user created successfully"
                });
            }).catch(err => {
                console.log('New user error: ', err);
                res.status(500).json({
                  error: err
                });
            });
          }
        });
      }
    });
});

router.delete("/:user_id", (req, res, next) => {
  User.remove({ _id: req.params.user_id }).exec().then(result => {
      console.log('Delete user result: ', result);
      res.status(200).json({
        message: "User was successfully deleted"
      });
    })
    .catch(err => {
      console.log('Delete user error: ', err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
