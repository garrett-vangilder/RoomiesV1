# Roomies (Front-End Capstone Project)

Hosted version here: [Roomies](https://roomies-39f08.firebaseapp.com/#/)

This application helps facilitate communication between roommates, allowing for roommates to organize groceries, bills, and events. 

## Technologies 

Angular 1.x | FireBase | SASS | Bower | NPM | Grunt 

## Walkthrough

This Walkthrough will display all the functionality of the application. 

### Login

This application allows for users to create accounts, all user information is saved to Firebase, this ensures security as Firebase does encrypt user emails and passwords. The user first views a tasteful splash screen before being able to login to the applciation. 

<kbd>![Login](images/roomies-walkthrough/loginScreen.png)</kbd>

### Register

This application does allow for users to register for the application as well. When registering for Roomies the user is asked to provide personal information. The email address and password will be encrpyted upon completing the form. Other information is not encrypted. 

<kbd>![Register User](images/roomies-walkthrough/registerUser.png)</kbd>

### Register Home 

Once the user registers, they will then be directed to a register home screen. At this point the user may either register a new home, or they may search for a pre-exisiting home to select.

<kbd>![Register Home](images/roomies-walkthrough/registerHome.png)</kbd>

### Search for Home 

If the user decided to search for their home through the search field, they must first enter in the desired postal code. Once the user confirms the postal code a list of homes will be displayed. These homes are password protected. Users choose the password for the home when registering the home with the application.

<kbd>![Home Search Results](images/roomies-walkthrough/homeSearchResults.png)</kbd>

### Home

Once the user is completely registered for the application they are taken to the home view. The home screen is where the user is allowed to select from a various set of tasks that they would like to complete. 

 <kbd>![Home View](images/roomies-walkthrough/homeView.png)</kbd>

 ### Chat

 One of the features of this application is the ability to communicate with other members of your home. Users may chat to their roommates through the chat feature. Each message is time stamped and color coded for the user.

 <kbd>![Chat](images/roomies-walkthrough/chatFeature.png)</kbd>






