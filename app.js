const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var expressJwt = require('express-jwt');
var path = require('path');
//const urlshorten = require("./models/UrlShorten");

const app = express();

// function parallel(middlewares) {
//     return function (req, res, next) {
//         async.each(middlewares, function (mw, cb) {
//             mw(req, res, cb);
//         }, next);
//     };
// }

app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-type,Accept,x-access-token,X-Key"
    );
    if (req.method == "OPTIONS") {
        res.status(200).end();
    } else {
        next();
    }
});


// app.use(function (err, req, res, next) {
//     if (err.constructor.name === 'UnauthorizedError') {
//         res.status(401).send('Unauthorized');
//     }
// });

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');



// HTML PAGES

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


app.get('/about', function (req, res) {
    res.sendFile(__dirname + '/views/chart.html');
});



// MODELS

var Url = require('./models/url');





// API END POINTS

app.get('/shrt/:code', Url.geturl);
app.post('/item', Url.posturl);
app.get('/GetCount', Url.geturldetails);



// CONNECTION TO MONGODB

var promise = mongoose.connect('mongodb://anupnair:yellowm1@ds125302.mlab.com:25302/yellow_m', {
    useNewUrlParser: true
});


//======================================================Connect to Port================================================================

const PORT = process.env.PORT || 4000;
app.listen(PORT);
console.log("Server connected to port" + " " + PORT);