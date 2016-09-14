"use strict";

var app = angular.module("Roomies", ["ngRoute"])
.constant("FirebaseURL", "https://roomies-39f08.firebaseio.com");

app.config(function($routeProvider) {
  $routeProvider.
  when("/", {
    templateUrl: "partials/landing-page.html",
    controller: "NewHomeCtrl"
  }).
  when("/registerhome", {
    templateUrl: "partials/register-home.html",
    controller: "NewHomeCtrl"
  }).
  when("/registeruser", {
    templateUrl: "partials/register-user.html",
    controller: "NewHomeCtrl"
  }).
  when("/home-tools/:homeid", {
    templateUrl: "partials/home-tools.html",
    controller: "HomeToolCtrl"
  }).
  when("/grocerylist/:homeid", {
    templateUrl: "partials/grocery-list.html",
    controller: "GroceryViewCtrl"
  }).
  when("/budget/:homeid", {
    templateUrl: "partials/budget-list.html",
    controller: "BudgetViewCtrl"
  }).
  when("/chores/:homeid", {
    templateUrl: "partials/chores-list.html",
    controller: "ChoresViewCtrl"
  }).
  when("/messages/:userid", {
    templateUrl: "partials/message-list.html",
    controller: "MessageViewCtrl"
  }).
  when("/invite-housemate/:userid", {
    templateUrl: "partials/invite-housemate.html",
    controller: "NewHouseMateCtrl"
  }).
  when("/info/:homeid", {
    templateUrl: "partials/home-profile.html",
    controller: "HomeProfileCtrl"
  }).
  otherwise("/");
});

app.run(function($location, FBCreds)  {
  console.log("Run!?")
  let creds = FBCreds;
  let authConfig = {
    apiKey: creds.apiKey,
    authDomain: creds.authDomain
  };
  firebase.initializeApp(authConfig);
});
