const mongoose = require("mongoose");
const shortCode = require("../middlewares/uniqueUrlCode");
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
//var token;
//const config = require('./../../config/appConfig');
var validUrl = require("valid-url");
// const {
//     Schema
// } = mongoose;

// const urlShortenSchema = new Schema({
//     originalUrl: String,
//     urlCode: String,
//     shortUrl: String,
//     createdAt: {
//         type: Date,
//         default: Date.now
//     },

// });

// mongoose.model("UrlShorten", urlShortenSchema);



var UrlSchema = mongoose.Schema({
    originalUrl: {
        type: String,
    },
    urlCode: {
        type: String,

    },
    shortUrl: {
        type: String,

    },

    createdAt: {
        type: String,
    }


});

//------------------------------------------Model---------------------------------------------------------------------------
var UrlDb = module.exports = mongoose.model('urls', UrlSchema);



module.exports.geturl = function (req, res) {

    var urlcode = req.params.code;
    console.log("urlCode ==== ", urlcode);
    if (urlcode != "robot.txt" || urlcode != "GetCount") {
        UrlDb.findOne({
            urlCode: urlcode
        }, function (err, resp) {
            if (err) {
                return res.redirect(constants.errorUrl);
            }

            //res.json(resp);
            console.log("resp ==== ", resp);

            return res.redirect(resp.originalUrl);
        });
    }
}



module.exports.posturl = function (req, res) {


    var formBody = {

        originalUrl: req.body.orginal,
    };



    // UrlDb.create(formBody, function (err, result) {

    //     if (err) {
    //         console.log(" Error in creating url ", err.message);
    //         res.status(500).json({
    //             "error": err.message
    //         })
    //         return;
    //     }

    var originalUrl = req.body.orginal;
    var createdAt = null;

    var shortBaseUrl = "http://localhost:4000/shrt";

    console.log("shortBaseUrl ==== ", shortBaseUrl);
    console.log("originalurl ==== ", originalUrl)
    if (validUrl.isUri(shortBaseUrl)) {} else {
        return res.status(404).json("Invalid Base Url format");
    }
    const urlCode = shortCode.generate();
    console.log("urlCode ==== ", urlCode)
    var today = new Date();
    console.log("today ====== ", today);
    if (validUrl.isUri(originalUrl)) {
        console.log("im in india");

        UrlDb.findOne({
            originalUrl: originalUrl
        }, function (err, respp) {

            if (respp) {
                console.log("Already in db");
                res.send(respp);
            } else {
                shortUrl = shortBaseUrl + "/" + urlCode;
                if (shortUrl != null || shortUrl == '') {
                    var item = new UrlDb({
                        originalUrl: originalUrl,
                        shortUrl: shortUrl,
                        urlCode: urlCode,
                        createdAt: today
                    });
                    item.save();
                    res.status(200).json({
                        originalUrl,
                        shortUrl,
                        urlCode,
                        createdAt
                    });
                    console.log("Successfully Shortened");
                } else {
                    console.log("Duplicate one");
                }

            }

        });


    } else {
        return res.status(401).json("Invalid Original Url.");
    }

    // })

}


module.exports.geturldetails = function (req, res) {

    UrlDb.find({}, function (err, result) {

        if (err) {
            res.send({
                "code": 500,
                "failed": "error ocurred"
            })
            console.log(" error", err.message);
        }
        console.log("  Url details fetched succesfully ", result);
        res.json(result);

    })


}