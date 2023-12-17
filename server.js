const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
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
    console.log(req.params.id);
    res.send(messages[req.params.id]);
})

app.post('/messages', (req, res) => {
    const userId = req.header('Authorization');
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
    registerData.id = users.length - 1;
    res.send(registerData);
})
app.listen(port, () => {
    console.log(`App is runing at port ${port}`);
})
