const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.get('/', (req, res) => {
    res.send("Test page!");
})

app.get('/messages', (req, res) => {
    const messages = ["Tangseng","Suwukong","Zhubajie","Shawujing"];
    res.send(messages);
})

app.listen(port, () => {
    console.log(`App is runing at port ${port}`);
})
