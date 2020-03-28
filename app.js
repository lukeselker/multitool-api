const express = require('express');
const bodyParser = require('body-parser');
const OpenTable = require('./openTable');
const Sendgrid = require('./sendMail');
let app = express();
var cors = require('cors');
var port = process.env.PORT || 3008;

require('dotenv').config()

app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Welcome to the MULTITOOL api')
});

app.post('/opentable', async (req, res) => {
    const { restaurantCode, partySize, requestedDate, requestedTime } = req.body;
    const data = await OpenTable.checkTimes(restaurantCode, partySize, requestedDate, requestedTime)
    res.send(data)
});

app.post('/sendMail', async (req, res) => {
    Sendgrid.send()
      .then(res.send('email sent'));
});

app.listen(port, function () {
    console.log(`Multitool Running on port ${port}!`)
});