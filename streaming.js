"use strict";

const logoutnappi = document.getElementById("logoutbutton");

logoutnappi.addEventListener("click", function(event){
  event.preventDefault();

  logoutUser().then(res => console.log(res));
  location.href = "login.html";
  console.log("asdfghj");
  localStorage.setItem("token",null);
});

const description = document.getElementById("desc");

getStreamById("5d975fa6bbc1c637c0c7aa09").then( res => { console.log(res);



    description.innerHTML= res.description;

});