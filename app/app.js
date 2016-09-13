"use strict";

var app = angular.module("Roomies", ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider.
  when("/", {
    templateUrl: "landing-page.html",
    controller: "LandingPageCtrl"
  }).
  when("/registerHome", {
    templateUrl: "register-home.html",
    controller: "NewHomeCtrl"
  }).
  when("/profile/:homeid", {
    templateUrl: "home-profile.html",
    controller: "HomeViewCtrl"
  }).
  when("/:homeid", {
    templateUrl: "home-tools.html",
    controller: "HomeToolCtrl"
  }).
  when("/grocerylist/:homeid", {
    templateUrl: "grocery-list.html",
    controller: "GroceryViewCtrl"
  }).
  when("budget/:homeid", {
    templateUrl: "budget-list.html",
    controller: "BudgetViewCtrl"
  }).
  when("chores/:homeid", {
    templateUrl: "chores-list.html",
    controller: "ChoresViewCtrl"
  }).
  when("messages/:userid", {
    templateUrl: "message-list.html",
    controller: "MessageViewCtrl"
  }).
  when("invite-housemate/:userid", {
    templateUrl: "invite-housemate.html",
    controller: "NewHouseMateCtrl"
  }).
  otherwise('/');
});
