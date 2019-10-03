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
    userID: { type : String , unique : true, required : true },
    username: { type : String , unique : true, required : true },
    password: String
});

//user document manipulation
app.post("/newuser", async (req, res) => {
    try {
        bcrypt.hash(req.body.password, rounds, (err, hash) => {
            //poor error handling
            if (err) {
            return err
          }
          let data = {
            userID: req.body.userID,
            username: req.body.username,
            password: hash
          }
          let user = new userModel(data);
            user.save();
            res.send(user.username);
        })
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/login", async (req, res) => {
    try {
        let user = await userModel.find( {"username": req.body.username} ).exec();

        //compare encrypted passwords
        let password = req.body.password;
        let hash = user[0].password;
        //if correct, create token
        if (await bcrypt.compare(password, hash)) {
            var token = jwt.sign({ id: user[0].userID }, process.env.SECRET, {
                expiresIn: 86400 // expires in 24 hours
              });
              console.log(token);
            return res.status(200).send({ auth: true, token: token });
        } else {
            return res.status(401).send({ auth: false, token: null });
        }
    } catch (error) {
        res.status(500).send(error);
    }
})

app.get("/logout", async (req, res) => {
    res.status(200).send({ auth: false, token: null });
})

app.get("/users", async (req, res) => {
    try {
        let result = await userModel.find().exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/users/:id", async (req, res) => {
    try {
        let user = await userModel.find( {"userID": req.params.id} ).exec();
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});


//Not working, IDK why
app.put("/users/:id", async (req, res) => {
    try {
        let user = await userModel.find( {"userID": req.params.id} ).exec();
        user.set(req.body);
        let result = await user.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete("/users/:id", async (req, res) => {
    try {
        let result = await userModel.deleteOne({ "userID": req.params.id }).exec();
        res.send(result);
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
app.post("/newstream", async (req, res) => {
    try {
        let stream = new streamModel(req.body);
        let result = await stream.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/streams", async (req, res) => {
    try {
        let result = await streamModel.find().exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/streams/:id", async (req, res) => {
    try {
        let stream = await streamModel.find( {"streamID": req.params.id} ).exec();
        res.send(stream);
    } catch (error) {
        res.status(500).send(error);
    }
});

//not working, IDK why
app.put("/streams/:id", async (req, res) => {
    try {
        let stream = await streamModel.find( {"streamID": req.params.id} ).exec();
        stream.set(req.body);
        let result = await stream.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.delete("/streams/:id", async (req, res) => {
    try {
        let result = await streamModel.deleteOne({ "streamID": req.params.id }).exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});


//start listening on port
app.listen(PORT, () => {
    console.log("Listening at :3000...");
});