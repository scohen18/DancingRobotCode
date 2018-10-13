const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
const path = require('path');

app.use(bodyParser.json({
    limit: '10mb'
}))
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: false
}));

app.use('/public', express.static(path.join(__dirname, 'public')))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var leftArm = 0;
var rightArm = 0;
var leftLeg = 0;
var rightLeg = 0;

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/getServoPositions', function(req, res){
    return res.send(String(Math.trunc(leftArm)) + "," + String(Math.trunc(rightArm)) + "," + String(Math.trunc(leftLeg)) + "," + String(Math.trunc(rightLeg)) + ",")
});

app.post('/setServoPositions', function(req, res){
    leftArm = req.body.leftArm;
    rightArm = req.body.rightArm;
    leftLeg = req.body.leftLeg;
    rightLeg = req.body.rightLeg;

    return res.send("done");
});

app.listen(port, () => console.log(`Dancing Robots listening on port ${port}!`))