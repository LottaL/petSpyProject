"use strict";
//sample how to use modules/fetching.js functions

getAllStreams().then(res => console.log(res));

const registerbutton = document.getElementById("nappi");

const loginbutton = document.getElementById("loginnappi");

const username = document.getElementById("registerusername");

const email =  document.getElementById("registeremail");

const password = document.getElementById("registerpassword");

registerbutton.addEventListener("click", function(event){
  event.preventDefault();
  console.log(event);
    registerUser(username,password,email)
});



loginbutton.addEventListener("click", function(event){
event.preventDefault();
console.log(event);

});