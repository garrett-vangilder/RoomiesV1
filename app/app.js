"use strict";

var app = angular.module("Roomies", ["ngRoute", "angularSpinner"])
    .constant("FirebaseURL", "https://roomies-39f08.firebaseio.com");

let isAuth = (AuthFactory) => new Promise( (resolve, reject) => {
  if(AuthFactory.isAuthenticated()) {
    resolve();
  } else {
    reject();
  }
});


app.config(function($routeProvider) {
    $routeProvider.
    when("/", {
        templateUrl: "partials/landing-page.html",
        controller: "NewHomeCtrl"
    }).
    when("/registerhome", {
        templateUrl: "partials/register-home.html",
        controller: "NewHomeCtrl",
    }).
    when("/registeruser", {
        templateUrl: "partials/register-user.html",
        controller: "NewHomeCtrl"
    }).
    when("/home-tools/", {
        templateUrl: "partials/home-tools.html",
        controller: "HomeToolCtrl",
        resolve: {isAuth}
    }).
    when("/home-tools/", {
      redirectTo: '/registerhome'
    }).
    when("/grocerylist/:homeid", {
        templateUrl: "partials/grocery-list.html",
        controller: "GroceryViewCtrl",
        resolve: {isAuth}
    }).
    when("/budget/:homeid", {
        templateUrl: "partials/budget-list.html",
        controller: "BudgetViewCtrl",
        resolve: {isAuth}
    }).
    when("/chores/:homeid", {
        templateUrl: "partials/chores-list.html",
        controller: "ChoresViewCtrl",
        resolve: {isAuth}
    }).
    when("/messages/:userid", {
        templateUrl: "partials/message-list.html",
        controller: "MessageViewCtrl",
        resolve: {isAuth}
    }).
    when("/invite-housemate/:userid", {
        templateUrl: "partials/invite-housemate.html",
        controller: "NewHouseMateCtrl",
        resolve: {isAuth}
    }).
    when("/info/:homeid", {
        templateUrl: "partials/home-profile.html",
        controller: "HomeProfileCtrl",
        resolve: {isAuth}
    }).
    otherwise("/");
});

app.run(function($location, FBCreds) {
    let creds = FBCreds;
    let authConfig = {
        apiKey: creds.apiKey,
        authDomain: creds.authDomain
    };
    firebase.initializeApp(authConfig);

});
