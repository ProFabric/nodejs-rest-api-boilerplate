const express = require('express');

const app = express();

app.get('/', function(req, res) {
    res.json({ status: true});
});

app.listen(3000, () => console.log('App is running on 3000'));