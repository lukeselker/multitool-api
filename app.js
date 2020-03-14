const express = require('express');
const bodyParser = require('body-parser');
const OpenTable = require('./openTable')
let app = express();
var port = process.env.PORT || 3008;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Welcome to the MULTITOOL api')
});

app.post('/opentable', async (req, res) => {
    const { restaurantCode, partySize, requestedDate, requestedTime } = req.body;
    const data = await OpenTable.checkTimes(restaurantCode, partySize, requestedDate, requestedTime)
    res.send(data)
});

app.listen(port, function () {
    console.log(`Multitool Running on port ${port}!`)
});