const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

app.post('/register', async (req, res) => {
    const registerData = req.body;

    // hash the code, then push it to array
    const hashed = await bcrypt.hash(registerData.password, 10);
    const user = {
        username:registerData.username,
        password:hashed
    };
    console.log(user);
    users.push(user);
    const userId = users.length - 1;

    let token;
    token = jwt.sign(userId, process.env.JWT_SECRET);
    res.send(token);
})

app.post('/login', async (req, res) => {
    const loginData = req.body;
    
    try {
        // if no user is found, throw an authentication error
        let userId = users.findIndex(user => user.username === loginData.username)
        if(userId === -1) {
            throw Error('Invalid username or password!');
        }
        const user = users[userId];
    
        // if the passwords don't match, throw an authentication error
        const valid = await bcrypt.compare(loginData.password, user.password);
        console.log(valid);
        if(!valid) {
            throw Error('Invalid username or password!');
        }

        let token;
        token = jwt.sign(userId, process.env.JWT_SECRET);
        res.send(token);          
    } catch (error) {
        res.status(401).send('Invalid username or password');
    }
})
app.listen(port, () => {
    console.log(`App is runing at port ${port}`);
})
