exports.MSAPP = exports.MSAPP || {};
exports.MSAPP.Controller = exports.MSAPP.Controller || {};
exports.MSAPP.Controller.UserController = exports.MSAPP.Controller.UserController || {};
var userRepo = require("../dbRepository/userRepo").MSAPP.Repo;
var User = require("../models/User");
const jwt = require('jsonwebtoken');
var config = require('../config/database');

exports.MSAPP.Controller.UserController.userSignIn = function (req, res) {
  console.log("user -> ",req.body);
  const body = req.body;
  userRepo.FindUsersFromDB(true,{Email: req.body.email}).then(function (userdata) {
    if(!userdata.obj){
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    }else{
      var user = userdata.obj;
      console.log("17 ", user);
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          // var token = jwt.sign(user, config.secret);
          var userObj = user.toObject();
          delete userObj.Password;
          const token = jwt.sign({prop : (user._id.toString() + "_" + Date.now())}, config.secret);
          userObj.token = token;
          res.json({userData: userObj, status: true});
        } else {
          res.send({status: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
};

exports.MSAPP.Controller.UserController.userSignUp = function (req, res) {
  if (!req.body.email || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    console.log(req.body);
    // var date = new Date(req.body.dob);
    // console.log(date);
    var newUser = new User({
      Email: req.body.email,
      Password: req.body.password,
      Contact: req.body.contact,
      UserType: req.body.userType,
      FullName: req.body.fullName,
      Location: req.body.location,
      FavouriteTeam: req.body.favTeam,
      Creation_Date: new Date(),
    });
    // save the user
    userRepo.SaveNewUser(newUser).then(function (userDetails) {
      if(userDetails){
        userRepo.FindUsersFromDB(true,{Email: req.body.email}).then(function (userdata) {
          if(!userdata){
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
          }else{
            var user = userdata.obj;
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
              if (isMatch && !err) {
                // if user is found and password is right create a token
                // var token = jwt.sign(user, config.secret);
                var userObj = user.toObject();
                delete userObj.Password;

                const token = jwt.sign({prop : (user._id.toString() + "_" + Date.now())}, config.secret);
                userObj.token = token;
                res.json({user: userObj, success: true, msg: 'Successful created new user.'});
                //console.log("token : ", token);
              } else {
                res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
              }
            });
          }
        });
        //res.json({success: true, msg: 'Successful created new user.'});
      }

    },function (err) {
      res.json({success: false, msg: 'Username already exists.'});
    });
  }
};
