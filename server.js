const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("Test page!");
})

app.get('/messages', (req, res) => {
    const messages = ["first","second","Facts"];
    res.send(messages);
})

app.listen(port, () => {
    console.log(`App is runing at port ${port}`);
})
