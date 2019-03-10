const express = require('express');

const app = express();
exports.MSAPP = exports.MSAPP || {};
exports.MSAPP.Routes = exports.MSAPP.Routes || {};
exports.MSAPP.Routes.UserRoutes = exports.MSAPP.Routes.UserRoutes || {};
var UserController = require('../controller/UserController.js').MSAPP.Controller.UserController;

exports.MSAPP.Routes.UserRoutes.initUserRoutes = function (app) {
  app.post("/api/userSignIn", UserController.userSignIn);
  app.post("/api/userSignUp", UserController.userSignUp);
};
