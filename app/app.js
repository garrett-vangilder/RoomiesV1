"use strict";

var app = angular.module("Roomies", ["ngRoute"]);

app.config(function($routeProvider) {
  console.log("works")
  $routeProvider.
  when("/", {
    templateUrl: "partials/landing-page.html",
    controller: "LandingPageCtrl"
  }).
  when("/registerhome", {
    templateUrl: "partials/register-home.html",
    controller: "NewHomeCtrl"
  }).
  when("/profile/:homeid", {
    templateUrl: "partials/home-profile.html",
    controller: "HomeViewCtrl"
  }).
  when("/profile/:homeid", {
    templateUrl: "partials/home-tools.html",
    controller: "HomeToolCtrl"
  }).
  when("/grocerylist/:homeid", {
    templateUrl: "partials/grocery-list.html",
    controller: "GroceryViewCtrl"
  }).
  when("budget/:homeid", {
    templateUrl: "partials/budget-list.html",
    controller: "BudgetViewCtrl"
  }).
  when("chores/:homeid", {
    templateUrl: "partials/chores-list.html",
    controller: "ChoresViewCtrl"
  }).
  when("messages/:userid", {
    templateUrl: "partials/message-list.html",
    controller: "MessageViewCtrl"
  }).
  when("invite-housemate/:userid", {
    templateUrl: "partials/invite-housemate.html",
    controller: "NewHouseMateCtrl"
  })
});
