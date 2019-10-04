"use strict";
const APIurl = "https://pet-spy-api.herokuapp.com";
const local = "http://localhost:3000";

//--------------------HOW TO USE-------------------------
//At the html-file, define this script !!FIRST!!
//You can now call these functions in any script after
//when calling a function, add .then(res => { <operations with res}) to wait until promise is resolved!! 
//like this ---> loginUser("Mintaka", "saapas").then(res => console.log(res));
//all functions have test/sample call right after the function
//
//

//register new user, only username is absolutely required
//if key-value pair is missing, don't put it in the object at all, API will sort it out
const registerUser = async (username, password, email) => {
    //parameters can be sent as an object, in that case alter the previous line
    //construct user object
    let user = {
        username: username,
        password: password,
        email: email
    }
    return await fetch(APIurl + '/newuser', 
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
            body: JSON.stringify(user)
            }
        )
        .then(res =>res.json())
        .then(result => {
        //console.log(result);
        return result;
        //returns user object with _id, username, encrypted password (if added) and email (if added)
        })
        .catch(err => console.error(err))  
};
//registerUser("Rollo", "Mintaka!", "Mintakaontyhma");


//checks if info matching, returns auth and token
const loginUser = async (username, password) => {
    let user = {
        username: username,
        password: password
    }
    return await fetch(APIurl + '/login', 
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
            body: JSON.stringify(user)
            }
        )
        .then(res => res.json())
        .then(res => {
            //console.log(res);
            return res;
            //returns one object with fields auth (true/false) and token
            //token expires in 24 hours
            //STRONG RECOMMENDATION: save token to localStorage
        })
        .catch(err => console.error(err)) 
};
//loginUser("Mintaka", "saapas");


//update user data based on token, userdata OBJECT!!
//if key-value pair is missing, don't put it in the object at all, API will sort it out
const updateUser = async (token, userObject) => {
    /*userObject = {
        username: username,
        email: email,
        password: password
    }*/
    return await fetch(APIurl + '/users/edit', 
        {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'x-access-token': token
            },
        body: JSON.stringify(userObject)
        }
        )
        .then(res => res.json())
        .then(res => {
            //console.log(res);
            return res;
            //returns new user data
        })
        .catch(err => console.error(err)) 
}
/*//sample token and imperfect user object
let thistoken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOTc2MWIyMzA2Nzc0MDAwNDRmMjg3MCIsImlhdCI6MTU3MDIwMjYxMywiZXhwIjoxNTcwMjg5MDEzfQ.l0yThEYUfETb_rqUeKvobZBo4d7rEjiGTOLwtWDhrC8";
let userObj = {
    email: "Minmin"
}*/
//updateUser(thistoken, userObj)


const logoutUser = async () => {
    return await fetch(APIurl + '/logout')
    .then(res => res.json())
    .then(result => {
        //console.log(result);
        return result;
        //always returns {auth: false, token: null}
        //STRONG RECOMMENDATION: wipe token OR save null to localStorage
    })
    .catch(err => console.error(err))
};
//logoutUser();


//Delete user based on token
const deleteUser = async (token) => {
    return await fetch(APIurl + '/users/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'x-access-token': token
        }
        })
        .then(res => res.json())
        .then(res => {
          //console.log(res);
          return res;
          //returns object containing info about operation
          //useful: res.ok (true/false) --> success, res.deletedCount (int) --> number of deleted documents
        })
        .catch(err => console.error(err)) 
};
//deleteUser("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOTc2MWIyMzA2Nzc0MDAwNDRmMjg3MCIsImlhdCI6MTU3MDIwMjYxMywiZXhwIjoxNTcwMjg5MDEzfQ.l0yThEYUfETb_rqUeKvobZBo4d7rEjiGTOLwtWDhrC8")


//all users no passwords
const getAllUsers = async () => {
    return await fetch(APIurl + '/users')
    .then(res => res.json())
    .then(res => {
        //console.log(res);
        return res;
        //list of user documents, with keys _id, username, email
    })
    .catch(err => console.error(err)) 
};
//getAllUsers();


//get all info on logged in user by token
const getLoggedUser = async (token) => {
    return await fetch(APIurl + '/users/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'x-access-token': token
        }
      })
    .then(res => res.json())
    .then(res => {
        //console.log(res);
        return res;
        //all data from user document in question: _id, username, email, (encrypted) password
    })
    .catch(err => console.error(err)) 
};
//getLoggedUser("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkOTc2MWRhMzA2Nzc0MDAwNDRmMjg3MSIsImlhdCI6MTU3MDIwMjg1NywiZXhwIjoxNTcwMjg5MjU3fQ.R53FGjntSxtxWOmfiuV1fNcx9b8OkFHxeOdTNvUEYJ4")


//get username and id
const getUserById = async (id) => {
    return await fetch(APIurl + '/users/' + id)
    .then(res => res.json())
    .then(res => {
        //console.log(res);
        return res;
        //one object with username and _id
    })
    .catch(err => console.error(err)) 
}
//getUserById("5d9761ed30677400044f2872")


//Stream info by id
const getStreamById = async (id) => {
    return await fetch(APIurl + '/streams/' + id)
    .then(res => res.json())
    .then(res => {
        //console.log(res);
        return res;
        //one stream info -object with keys _id, name, description, sourceURL
    })
    .catch(err => console.error(err)) 
};
//getStreamById("5d96463386ec686798a8ce42");

//list of streams no URLs
const getAllStreams = async () => {
    return await fetch(APIurl + '/streams')
    .then(res => res.json())
    .then(res => {
        //console.log(res);
        return res;
        //list of stream info documents without sourceURL fields
    })
    .catch(err => console.error(err)) 
}
//getAllStreams();
