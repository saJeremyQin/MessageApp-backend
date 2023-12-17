const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const messages = ["Tangseng","Suwukong","Zhubajie","Shawujing"];
const users = [];

app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send("Test page!");
})

app.get('/messages', (req, res) => {
    res.send(messages);
})

app.get('/messages/:id', (req, res) => {
    console.log(req.params.id);
    res.send(messages[req.params.id]);
})

app.post('/messages', (req, res) => {
    let msg = req.body;
    messages.push(msg.message);
    res.json(msg);
})

app.post('/register', (req, res) => {
    const registerData = req.body;
    users.push(registerData);
    console.log(users);
    res.send(users);
})
app.listen(port, () => {
    console.log(`App is runing at port ${port}`);
})
