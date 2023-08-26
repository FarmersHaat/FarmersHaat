"use strict";
var crypto = require('crypto');
// var crypt = require('./crypt');

function VtransactSecurity() {}
// class VtransactSecurity {
//  This method is used to return encrypted data.

VtransactSecurity.prototype.encryptValue = function(inputVal, secureKey) {
        try {
            // console.log(inputVal);
            var encrypted_text = '';
            // console.log("in vt " + secureKey);
            // be sure you pass in the right encoding for the key!
            var encryptionKeyBuf = new Buffer(secureKey, "hex");
            // console.log(encryptionKeyBuf);
            // get the AES algorithm version from the key size
            var keySizeBits = encryptionKeyBuf.length * 8;
            // console.log(keySizeBits);
            var aesAlgorithm = "AES-" + keySizeBits + "-ECB";
            // console.log(aesAlgorithm);
            // because PKCS5Padding uses 8-byte block sizes
            var ivBuf = new Buffer.alloc(0);
            var cipher = crypto.createCipheriv(
                aesAlgorithm,
                encryptionKeyBuf,
                ivBuf);
            encrypted_text = cipher.update(inputVal, 'utf8', 'hex');
            encrypted_text += cipher.final('hex');
            // console.log(encrypted_text);
            return encrypted_text;
            // return [
            //     cipher.update(inputVal, "utf8", "hex"),
            //     cipher.final("hex")
            // ].join('')
        }
        // merchantRequest = reqMsgDTO.getReqMsg();
        // res.send(merchantRequest + ' Submitted Successfully!');
        catch (ex) {
            reqMsgDTO.setStatusDesc("Error Occurred during processing" + ex);
            console.log(ex)
                // throw new Exception(ex.getMessage());
        } // If request message generate

    }
    //  This method is used to return decrypted data.

VtransactSecurity.prototype.decryptValue = function(inputVal, secureKey) {
    // console.log(inputVal);
    // console.log(secureKey);
    var encryptionKeyBuf = new Buffer(secureKey, "hex");
    // console.log(encryptionKeyBuf);
    var keySizeBits = encryptionKeyBuf.length * 8;
    // console.log(keySizeBits);
    var aesAlgorithm = "AES-" + keySizeBits + "-ECB";
    // console.log(aesAlgorithm);
    var ivBuf = new Buffer.alloc(0);
    var decipher = crypto.createDecipheriv(
        aesAlgorithm,
        encryptionKeyBuf,
        ivBuf);
    // const decipher = crypto.createDecipheriv('aes-256-ecb', this.key, this.iv);
    // decipher.setAutoPadding(true);
    let decrypted_text = decipher.update(inputVal, "hex", 'utf8');
    decrypted_text += decipher.final('utf8');

    return decrypted_text;
}

module.exports = VtransactSecurity;

// }