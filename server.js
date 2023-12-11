const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const messages = ["Tangseng","Suwukong","Zhubajie","Shawujing"];

app.use(cors());
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send("Test page!");
})

app.get('/messages', (req, res) => {
    res.send(messages);
})

app.post('/messages', (req, res) => {
    console.log(req.body);
    let msg = req.body;
    messages.push(msg.message);
    // res.send({messages});
    res.json(msg);
    console.log(messages);
})

app.listen(port, () => {
    console.log(`App is runing at port ${port}`);
})
