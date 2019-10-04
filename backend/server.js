//password encrypting
const bcrypt = require('bcrypt');
const rounds = 10;
var jwt = require('jsonwebtoken');

//DB stuff
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//environmental letiables
require('dotenv').config();
const PORT = process.env.PORT || 3000;

//connect to mongoDB
const app = express();
mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
    console.log(err.message);
    });
const fs = require('fs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//user document schema
const userModel = mongoose.model("user", {
    username: { type : String , unique : true, required : true },
    password: String
});

//user document manipulation
//create user, no token
app.post("/newuser", async (req, res) => {
    try {
        //password encryption
        bcrypt.hash(req.body.password, rounds, (err, hash) => {
            //poor error handling
            if (err) {
            return err
            }
            let data = {
                username: req.body.username,
                password: hash
            }
            let user = new userModel(data);
            user.save();
            res.send(user);
        })
    } catch (error) {
        res.status(500).send(error);
    }
});

//check username and pswd, create token
app.get("/login", async (req, res) => {
    try {
        //get user info
        let user = await userModel.findOne( {"username": req.body.username} ).exec();
        //compare encrypted passwords
        //if correct, create token
        let password = req.body.password;
        let hash = user.password;
        if (await bcrypt.compare(password, hash)) {
            var token = jwt.sign({ id: user._id }, process.env.SECRET, {
                expiresIn: 86400 // expires in 24 hours
              });
              console.log(token);
            //return token
            return res.status(200).send({ auth: true, token: token });
        } else {
            return res.status(401).send({ auth: false, token: null });
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

//remove token
app.get("/logout", async (req, res) => {
    res.status(200).send({ auth: false, token: null });
})

//usernames and id of all users
app.get("/users", async (req, res) => {
    try {
        let result = await userModel.find({}, { username: 1 }).exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

//logged user's own info based on token
app.get("/users/me", async (req, res) => {
    try {
        let token = req.headers['x-access-token'];
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
        //check if token valid
        jwt.verify(token, process.env.SECRET, async function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            
            //id decoded from access token
            let user = await userModel.findById(decoded.id, function (err, user) {
                if (err) return res.status(500).send("There was a problem finding the user.");
                if (!user) return res.status(404).send("No user found.");
            }).exec();
            res.status(200).send(user);
        });
    } catch (error) {
        res.status(500).send(error);
    }
})

//username and id, no pswd
app.get("/users/:id", async (req, res) => {
    try {
        let user = await userModel.findById(req.params.id).exec();
        res.send({_id: user._id, username: user.username});
    } catch (error) {
        res.status(500).send(error);
    }
});

//Edit user info
//Not working, IDK why
//should probably check token
app.put("/users/:id", async (req, res) => {
    try {
        let user = await userModel.findById(req.params.id).exec();
        user.set(req.body);
        let result = await user.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

//delete user based on token
app.delete("/users/delete", async (req, res) => {
    try {
        let token = req.headers['x-access-token'];
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
        //check if token valid
        jwt.verify(token, process.env.SECRET, async function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            
            //id decoded from access token
            let result = await userModel.deleteOne({ _id: decoded.id }).exec();
            res.status(200).send(result);
        });
    } catch (error) {
        res.status(500).send(error);
    }
});


//stream document model
const streamModel = mongoose.model("stream", {
    streamID: { type : String , unique : true, required : true },
    name: { type : String, required : true },
    description: String,
    sourceURL: String
});

//stream document manipulation
//new stream
app.post("/newstream", async (req, res) => {
    try {
        let stream = new streamModel(req.body);
        let result = await stream.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

//all streams no URL
app.get("/streams", async (req, res) => {
    try {
        let result = await streamModel.find({}, {name: 1, description: 1}).exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

//all stream info based on id
app.get("/streams/:id", async (req, res) => {
    try {
        let stream = await streamModel.find( {_id: req.params.id} ).exec();
        res.send(stream);
    } catch (error) {
        res.status(500).send(error);
    }
});

//stream edit
//not working, IDK why
app.put("/streams/:id", async (req, res) => {
    try {
        let stream = await streamModel.find( {_id: req.params.id} ).exec();
        stream.set(req.body);
        let result = await stream.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

//delete stream
app.delete("/streams/:id", async (req, res) => {
    try {
        let result = await streamModel.deleteOne({ _id: req.params.id }).exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});


//start listening on port
app.listen(PORT, () => {
    console.log("Listening at :3000...");
});