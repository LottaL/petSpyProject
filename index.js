"use strict";
//sample how to use modules/fetching.js functions

getAllStreams().then(res => console.log(res));

const registerbutton = document.getElementById("nappi");

const username = document.getElementById("registerusername");

const email =  document.getElementById("registeremail");

const password = document.getElementById("registerpassword");

const repassword = document.getElementById("checkpassword");

registerbutton.addEventListener("click", function(event){
  event.preventDefault();
    if(password.value===repassword.value){
      registerUser(username.value,password.value,email.value).then(res => console.log(res));
      alert("Account creation successful!")
      document.getElementsByClassName("kentat input").value = '';
    }else{
      alert("The passwords do not match!")
    }


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
  }else{
    alert("Username and/or password is wrong!");
    document.getElementsByClassName("kentat").value = '';
  }
})


});

