"use strict";

const logoutnappi = document.getElementById("logoutbutton");

logoutnappi.addEventListener("click", function(event){
  event.preventDefault();

  logoutUser().then(res => console.log(res));
  location.href = "login.html";
  console.log("asdfghj");
  localStorage.setItem("token",null);
});