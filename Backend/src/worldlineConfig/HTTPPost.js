//  This class is used to connect Pay service.
"use strict";
// class HTTPPost {
// const request = require('request')
// var http = require('http');
// var https = require('https');

function HTTPPost() {}

HTTPPost.prototype.excutePost = function(qpURL, merchantReqStrT, mid) {

    // console.log(qpURL);
    // console.log(merchantReqStrT)
    // console.log(mid)
    var request = require('request');
    var options = {
        'method': 'POST',
        // 'url': 'https://cgt.in.worldline.com/ipg/getTransactionStatus',
        'url': qpURL,
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            'merchantReqStrT': merchantReqStrT,
            'mid': mid
        }
    };
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) reject(error);
            if (response.statusCode != 200) {
                console.log('Invalid status code <' + response.statusCode + '>')
                reject('Invalid status code <' + response.statusCode + '>');
            }
            // console.log("test")
            resolve(body);
        });
    });

}
module.exports = HTTPPost;

// }