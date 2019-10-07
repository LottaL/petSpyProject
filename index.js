"use strict";
//sample how to use modules/fetching.js functions

getAllStreams().then(res => console.log(res));

const registerbutton = document.getElementById("nappi");

const username = document.getElementById("registerusername");

const email =  document.getElementById("registeremail");

const password = document.getElementById("registerpassword");

registerbutton.addEventListener("click", function(event){
  event.preventDefault();

    registerUser(username.value,password.value,email.value).then(res => console.log(res));

});


const loginbutton = document.getElementById("loginnappi");

const loginuser = document.getElementById("loginusername");

const loginpassword = document.getElementById("loginpassword");



loginbutton.addEventListener("click", function(event){
event.preventDefault();

loginUser(loginuser.value,loginpassword.value).then(res => { console.log(res);
const auth = res.auth;
  console.log(res);
  if(auth){
    localStorage.setItem("token",res.token);
    location.href = "streaming.html"
  }
})


});