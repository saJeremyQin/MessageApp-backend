const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const app = express();
const port = 3000;

const messages = [{user: "Jim", text: "Tangseng"},{user: "Jim", text: "Suwukong"},];
const users = [{username:"Jim", password:"123"}];

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Test page!");
})

app.get('/messages', (req, res) => {
    res.send(messages);
})

app.get('/messages/:id', (req, res) => {
    console.log(req.params);
    res.send(messages[req.params.id]);
})

app.post('/messages', (req, res) => {
    const token = req.header('Authorization');
    const userId = jwt.decode(token, process.env.JWT_SECRET );

    const user = users[userId];
    let msg = {
        user: user.username,
        text:req.body.message
    }

    messages.push(msg);
    res.json(msg);
})

app.post('/register', (req, res) => {
    const registerData = req.body;
    users.push(registerData);
    console.log(users);
    const userId = users.length - 1;

    let token;
    token = jwt.sign(userId, process.env.JWT_SECRET);
    // console.log(token);
    res.send(token);
})

app.post('/login', (req, res) => {
    const loginData = req.body;
    // if no user is found, throw an authentication error
    let userId = users.findIndex(user => user.username == loginData.username)
    if(userId == -1) {
        throw Error('Invalid username or password!');
    }

    // if the passwords don't match, throw an authentication error

    // create and return the json web token
    res.send('ok');
})
app.listen(port, () => {
    console.log(`App is runing at port ${port}`);
})
