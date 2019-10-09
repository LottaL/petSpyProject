<<<<<<< HEAD
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
    registerUser("Me","pass","daa").then(res => console.log(res))
});



loginbutton.addEventListener("click", function(event){
event.preventDefault();
console.log(event);

});
=======
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
  if(username.value.length>0) {
    if(email.value.length>0) {
      if(password.value.length>0) {
        if (password.value === repassword.value) {
          registerUser(username.value, password.value, email.value).
              then(res => console.log(res));
          alert("Account creation successful!")
          document.getElementsByClassName("kentat input").value = '';
        } else {
          alert("The password do not match!")
        }
      }else{
        alert("password is required to create an account!")
      }
    }else{
      alert("email is required to create an account!")
    }
  }else{
    alert("username is required to create an account!")
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

>>>>>>> 93c1e050ee21c6f73b9beeaba96caf30aa208dd6
