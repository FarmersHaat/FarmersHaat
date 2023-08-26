var ResMsgDTO = require('./ResMsgDTO.js');
// var ReqMsgDTO = require('./ReqMsgDTO.js');
var VtransactSecurity = require('./VtransactSecurity.js');
var HTTPPost = require('./HTTPPost.js');
// var reqMsgDTO = new ReqMsgDTO();
// var resMsgDTO = new ResMsgDTO();
var vTransactSecurity = new VtransactSecurity();
// var httpPost = HTTPPost();
var http = require('http');
const fs = require('fs');
const ini = require('ini');
const ini_array = ini.parse(fs.readFileSync('./ClientAPI.ini', 'utf-8'));

function AWLMEAPI() {}

//  This method is used to return transaction status
//  mid
//  orderId
//  transactionRefNo
//  enc_key
//  ResMsgDTO ResMsgDTO 
//  
AWLMEAPI.prototype.generateTrnReqMsg = function(reqMsgDTO) {

    if (!(reqMsgDTO.getAddField10())) {
        reqMsgDTO.setAddField10("NA");
    }

    if (!(reqMsgDTO.getAddField9())) {
        reqMsgDTO.setAddField9("NA");
    }

    try {

        if (!(reqMsgDTO) ||
            !(reqMsgDTO.getMid()) ||
            !(reqMsgDTO.getOrderId()) ||
            !(reqMsgDTO.getTrnAmt()) ||
            !(reqMsgDTO.getMeTransReqType()) ||
            !(reqMsgDTO.getEnckey()) ||
            !(reqMsgDTO.getResponseUrl()) ||
            !(reqMsgDTO.getTrnCurrency())
        ) {
            reqMsgDTO.setStatusDesc("Mandatory fields are missing");
            // console.log("test1");
            return reqMsgDTO;

        }
        // console.log("test1");
        if (!((reqMsgDTO.getMeTransReqType() == "R") || (reqMsgDTO.getMeTransReqType() == "P") || (reqMsgDTO.getMeTransReqType() == "S"))) {
            reqMsgDTO.setStatusDesc("Mandatory fields are missing");
            // console.log("test2");
            return reqMsgDTO;

        }
        // console.log("test2");
        if ((reqMsgDTO.getMeTransReqType() == "R") &&
            (!(reqMsgDTO.getRecurrPeriod()) ||
                !(reqMsgDTO.getRecurrDay()) ||
                !(reqMsgDTO.getNoOfRecurring()))) {
            // console.log("test3");
            reqMsgDTO.setStatusDesc("Mandatory fields are missing for recurring payment");
            return reqMsgDTO;
        }


        // console.log("test3");
        var merchantReqStr = reqMsgDTO.getMid() +
            "|" + reqMsgDTO.getOrderId() +
            "|" + reqMsgDTO.getTrnAmt() +
            "|" + reqMsgDTO.getTrnCurrency() +
            "|" + reqMsgDTO.getTrnRemarks() +
            "|" + reqMsgDTO.getMeTransReqType() +
            "|" + reqMsgDTO.getRecurrPeriod() +
            "|" + reqMsgDTO.getRecurrDay() +
            "|" + reqMsgDTO.getNoOfRecurring() +
            "|" + reqMsgDTO.getResponseUrl() +
            "|" + reqMsgDTO.getAddField1() +
            "|" + reqMsgDTO.getAddField2() +
            "|" + reqMsgDTO.getAddField3() +
            "|" + reqMsgDTO.getAddField4() +
            "|" + reqMsgDTO.getAddField5() +
            "|" + reqMsgDTO.getAddField6() +
            "|" + reqMsgDTO.getAddField7() +
            "|" + reqMsgDTO.getAddField8() +
            "|" + reqMsgDTO.getAddField9() +
            "|" + reqMsgDTO.getAddField10();
        // console.log(merchantReqStr);
        // var vTransactSecurity = new VTransactSecurity();
        // console.log("test vTransactSecurity ");
        var enc_data = vTransactSecurity.encryptValue(merchantReqStr, reqMsgDTO.getEnckey());
        // console.log(enc_data);
        reqMsgDTO.setReqMsg(enc_data);
        reqMsgDTO.setStatusDesc("Success");

    } catch (ex) {
        reqMsgDTO.setStatusDesc("Error Occurred during Creating request message " + ex);
        // throw new Exception(ex.getMessage());

    }
    return reqMsgDTO;
}


AWLMEAPI.prototype.parseTrnResMsg = async function(enc_data, enc_key) {

    var resMsgDTO = new ResMsgDTO();
    try {

        var dec_data = vTransactSecurity.decryptValue(enc_data, enc_key);
        // console.log(dec_data)
        if (!(dec_data)) {
            resMsgDTO.setStatusCode("F");
            resMsgDTO.setStatusDesc("Invalid response message");
            return resMsgDTO;
        }
        // console.log("test 4")
        var strings = dec_data.split("|");
        // console.log("test 3")
        if (!(strings) && (strings.length) != 22) {

            resMsgDTO.setStatusCode("F");
            resMsgDTO.setStatusDesc("Number of fields not matching.");
            return resMsgDTO;
        }
        // console.log("test 2") 
        resMsgDTO.setPgMeTrnRefNo(strings[0]);
        resMsgDTO.setOrderId(strings[1]); // ORDERID
        resMsgDTO.setTrnAmt(strings[2]);
        resMsgDTO.setAuthNStatus(strings[3]); // AUTHNSTATUS
        resMsgDTO.setAuthZStatus(strings[4]);
        resMsgDTO.setCaptureStatus(strings[5]);
        resMsgDTO.setRrn(strings[6]);
        resMsgDTO.setAuthZCode(strings[7]);
        resMsgDTO.setResponseCode(strings[8]);
        resMsgDTO.setTrnReqDate(strings[9]);
        resMsgDTO.setStatusCode(strings[10]);
        resMsgDTO.setStatusDesc(strings[11]);
        resMsgDTO.setAddField1(strings[12]);
        resMsgDTO.setAddField2(strings[13]);
        resMsgDTO.setAddField3(strings[14]);
        resMsgDTO.setAddField4(strings[15]);
        resMsgDTO.setAddField5(strings[16]);
        resMsgDTO.setAddField6(strings[17]);
        resMsgDTO.setAddField7(strings[18]);
        resMsgDTO.setAddField8(strings[19]);
        resMsgDTO.setAddField9(strings[20]);
        resMsgDTO.setAddField10(strings[21]);
        // console.log("test");

    } catch (ex) {
        resMsgDTO.setStatusCode("Error Occurred " + ex);

    }
    resMsgDTO.getOrderId();


    return resMsgDTO;

}



AWLMEAPI.prototype.getTransactionStatus = async function(mid, orderid, pgmetrn, enc_key) {
    var enc_data = null;
    // var host = ini_array.HOST
    var qpURL = ini_array.GET_TRANS_STATUS;
    // console.log(qpURL)
    var resMsgDTO = new ResMsgDTO();
    var httpPost = new HTTPPost();
    var vtransactSecurity = new VtransactSecurity();

    if (!(mid) || !(orderid) || !(enc_key)) {
        resMsgDTO.setStatusCode("F");
        resMsgDTO.setStatusDesc("Invalid request was received.");
        return resMsgDTO;
    }
    var strVar = "";
    var merchantReqStr = mid +
        "|" + orderid +
        "|" + pgmetrn + "|" + strVar +
        "|" + strVar + "|" + strVar +
        "|" + strVar +
        "|" + strVar +
        "|" + strVar +
        "|" + strVar +
        "|" + strVar +
        "|" + strVar + "|";
    // console.log(merchantReqStr)
    enc_data = vtransactSecurity.encryptValue(merchantReqStr, enc_key);

    enc_data = await httpPost.excutePost(qpURL, enc_data, mid)

    resMsgDTO = await this.parseTrnResMsg(enc_data, enc_key);
    return resMsgDTO
}


//  This method is used to call cancel or refund transaction.

//   mid
//   orderId
//   pgmetrn
// cancelRefundFlag
//   amount
//   enc_key
//   @return
//  @throws Exception

AWLMEAPI.prototype.cancelTransaction = async function(reqMsgDTO) {

    if (!(reqMsgDTO.getAddField10())) {
        reqMsgDTO.setAddField10("NA");
    }

    if (!(reqMsgDTO.getAddField9())) {
        reqMsgDTO.setAddField9("NA");
    }

    var resMsgDTO = new ResMsgDTO();
    var httpPost = new HTTPPost();
    // console.log('test 3')
    try {
        if (!(reqMsgDTO.getMid()) ||
            !(reqMsgDTO.getOrderId()) ||
            !(reqMsgDTO.getPgMeTrnRefNo()) ||
            !(reqMsgDTO.getEnckey())
        ) {

            resMsgDTO.setStatusCode("F");
            resMsgDTO.setStatusDesc("Invalid request was received.");

            return resMsgDTO;
        }
        // var host = ini_array.HOST;
        var qpURL = ini_array.CANCEL_TRANS_API;



        if (!(reqMsgDTO.getTrnAmt())) {
            reqMsgDTO.setTrnAmt('');
        }

        var merchantReqStr = reqMsgDTO.getMid() + "|" + reqMsgDTO.getOrderId() +
            "|" + reqMsgDTO.getPgMeTrnRefNo() +
            "|" + reqMsgDTO.getTrnAmt() +
            "|" + reqMsgDTO.getAddField1() +
            "|" + reqMsgDTO.getAddField2() +
            "|" + reqMsgDTO.getAddField3() +
            "|" + reqMsgDTO.getAddField4() +
            "|" + reqMsgDTO.getAddField5() +
            "|" + reqMsgDTO.getAddField6() +
            "|" + reqMsgDTO.getAddField7() +
            "|" + reqMsgDTO.getAddField8() +
            "|" + reqMsgDTO.getAddField9() +
            "|" + reqMsgDTO.getAddField10();

        // console.log(merchantReqStr);
        var vtransactSecurity = new VtransactSecurity();
        var enc_data = vtransactSecurity.encryptValue(merchantReqStr, reqMsgDTO.getEnckey());
        // console.log(enc_data);

        var mid = reqMsgDTO.getMid();
        // console.log(enc_data);
        enc_data = await httpPost.excutePost(qpURL, enc_data, mid)
        console.log(enc_data);
        var dec_data = vtransactSecurity.decryptValue(enc_data, reqMsgDTO.getEnckey());
        // console.log(dec_data)
        // var strings = explode("|", dec_data);
        var strings = dec_data.split("|");
        // console.log("test 3")

        if (!(strings) && (strings.length) != 16) {
            resMsgDTO.setStatusCode("F");
            resMsgDTO.setStatusDesc("Number of fields not matching.");
            return resMsgDTO;

        }

        resMsgDTO.setPgMeTrnRefNo(strings[0]); // PGTRNREFNO
        resMsgDTO.setOrderId(strings[1]); // ORDERID
        resMsgDTO.setPgRefCancelReqId(strings[2]);
        resMsgDTO.setRefundAmt(strings[3]);
        resMsgDTO.setStatusCode(strings[4]);
        resMsgDTO.setStatusDesc(strings[5]);
        resMsgDTO.setAddField1(strings[6]);
        resMsgDTO.setAddField2(strings[7]);
        resMsgDTO.setAddField3(strings[8]);
        resMsgDTO.setAddField4(strings[9]);
        resMsgDTO.setAddField5(strings[10]);
        resMsgDTO.setAddField6(strings[11]);
        resMsgDTO.setAddField7(strings[12]);
        resMsgDTO.setAddField8(strings[13]);
        resMsgDTO.setAddField9(strings[14]);
        resMsgDTO.setAddField10(strings[15]);
    } catch (ex) {
        resMsgDTO.setStatusCode("Error Occurred " + ex);
    }
    return resMsgDTO;
}

AWLMEAPI.prototype.refundTransaction = async function(reqMsgDTO) { //reqMsgDTO = new ReqMsgDTO(); 

    if (!(reqMsgDTO.getAddField10())) {
        reqMsgDTO.setAddField10("NA");
    }

    if (!(reqMsgDTO.getAddField9())) {
        reqMsgDTO.getAddField9("NA");
    }
    var resMsgDTO = new ResMsgDTO();
    var httpPost = new HTTPPost();

    try {
        if (!(reqMsgDTO.getMid()) ||
            !(reqMsgDTO.getOrderId()) ||
            !(reqMsgDTO.getPgMeTrnRefNo()) ||
            !(reqMsgDTO.getEnckey()) ||
            !(reqMsgDTO.getRefundAmt())) {

            resMsgDTO.setStatusCode("F");
            resMsgDTO.setStatusDesc("Mandatory fields are missing.");
            return resMsgDTO;
        }

        if (!(reqMsgDTO.getAddField10())) {
            reqMsgDTO.setAddField10('NA');
        }
        // var host = ini_array.HOST
        var qpURL = ini_array.REFUND_TRANS_API;

        var merchantReqStr = reqMsgDTO.getMid() +
            "|" + reqMsgDTO.getOrderId() +
            "|" + reqMsgDTO.getPgMeTrnRefNo() +
            "|" + reqMsgDTO.getRefundAmt() +
            "|" + reqMsgDTO.getAddField1() +
            "|" + reqMsgDTO.getAddField2() +
            "|" + reqMsgDTO.getAddField3() +
            "|" + reqMsgDTO.getAddField4() +
            "|" + reqMsgDTO.getAddField5() +
            "|" + reqMsgDTO.getAddField6() +
            "|" + reqMsgDTO.getAddField7() +
            "|" + reqMsgDTO.getAddField8() +
            "|" + reqMsgDTO.getAddField9() +
            "|" + reqMsgDTO.getAddField10();


        var vtransactSecurity = new VtransactSecurity();
        var enc_data = vtransactSecurity.encryptValue(merchantReqStr, reqMsgDTO.getEnckey());

        // var urlParameters = "merchantReqStrT=" + enc_data + "&mid=" + reqMsgDTO.getMid();

        // enc_data = httpPost.excutePost(qpURL, urlParameters, enc_data, reqMsgDTO.getMid());
        enc_data = await httpPost.excutePost(qpURL, enc_data, mid)

        var dec_data = vtransactSecurity.decryptValue(enc_data, reqMsgDTO.getEnckey());

        var strings = explode("|", dec_data);
        if (!!(strings) && sizeof(strings) != 16) {
            resMsgDTO.setStatusCode("F");
            resMsgDTO.setStatusDesc("Number of fields not matching.");
            return resMsgDTO;



        }

        resMsgDTO.setPgMeTrnRefNo(strings[0]); // PGTRNREFNO
        resMsgDTO.setOrderId(strings[1]); // ORDERID
        resMsgDTO.setPgRefCancelReqId(strings[2]);
        resMsgDTO.setRefundAmt(strings[3]);
        resMsgDTO.setStatusCode(strings[4]);
        resMsgDTO.setStatusDesc(strings[5]);
        resMsgDTO.setAddField1(strings[6]);
        resMsgDTO.setAddField2(strings[7]);
        resMsgDTO.setAddField3(strings[8]);
        resMsgDTO.setAddField4(strings[9]);
        resMsgDTO.setAddField5(strings[10]);
        resMsgDTO.setAddField6(strings[11]);
        resMsgDTO.setAddField7(strings[12]);
        resMsgDTO.setAddField8(strings[13]);
        resMsgDTO.setAddField9(strings[14]);
        resMsgDTO.setAddField10(strings[15]);
    } catch (ex) {
        throw new Exception(ex.getMessage());
    }
    return resMsgDTO;
}

AWLMEAPI.prototype.generateTrnReqMsgWithCard = function(reqMsgDTO) {


    try {
        if (!(reqMsgDTO) ||
            !(reqMsgDTO.getMid()) ||
            !(reqMsgDTO.getOrderId()) ||
            !(reqMsgDTO.getTrnAmt()) ||
            !(reqMsgDTO.getMeTransReqType()) ||
            !(reqMsgDTO.getEnckey()) ||
            !(reqMsgDTO.getResponseUrl()) ||
            !(reqMsgDTO.getTrnCurrency())
        ) {

            reqMsgDTO.setStatusDesc("Mandatory fields are missing");
            return reqMsgDTO;
        }

        if (!(reqMsgDTO.getAddField10())) {
            reqMsgDTO.setAddField10("NA");
        }

        if (!(reqMsgDTO.getAddField9())) {
            reqMsgDTO.getAddField9("NA");
        }

        if (!((reqMsgDTO.getMeTransReqType() == "R") || (reqMsgDTO.getMeTransReqType() == "P") || (reqMsgDTO.getMeTransReqType() == "S"))) {
            reqMsgDTO.setStatusDesc("Mandatory fields are missing");
            return reqMsgDTO;
        }
        if ((reqMsgDTO.getMeTransReqType() == "R") &&
            (!(reqMsgDTO.getRecurrPeriod() || !(reqMsgDTO.getRecurrPeriod())) ||
                !(reqMsgDTO.getRecurrDay()) || !(reqMsgDTO.getRecurrDay()) ||
                !(reqMsgDTO.getNoOfRecurring()) || !(reqMsgDTO.getNoOfRecurring()))) {

            reqMsgDTO.setStatusDesc("Mandatory fields are missing for recurring payment");
            return reqMsgDTO;
        }


        if (reqMsgDTO.getPayTypeCode() == "DC" || reqMsgDTO.getPayTypeCode() == "CC" ||
            reqMsgDTO.getPayTypeCode() == "CUG") {

            if (!(reqMsgDTO.getCardNumber()) ||
                !(reqMsgDTO.getExpiryDate()) ||
                !(reqMsgDTO.getPayTypeCode())
            ) {


                reqMsgDTO.setStatusDesc("Card details are missing.");
                return reqMsgDTO;
            }
            reqMsgDTO.setNetBankCode("NA");

        } else if (reqMsgDTO.getPayTypeCode() == "NB") {

            if (!(reqMsgDTO.getNetBankCode())) {
                reqMsgDTO.setStatusDesc("Net bank code is missing");
                return reqMsgDTO;
            }

        } else {
            reqMsgDTO.setStatusDesc("Invalid pay type code");
            return reqMsgDTO;
        }



        var merchantReqStr = reqMsgDTO.getMid() +
            "|" + reqMsgDTO.getOrderId() +
            "|" + reqMsgDTO.getTrnAmt() +
            "|" + reqMsgDTO.getTrnCurrency() +
            "|" + reqMsgDTO.getTrnRemarks() +
            "|" + reqMsgDTO.getMeTransReqType() +
            "|" + reqMsgDTO.getRecurrPeriod() +
            "|" + reqMsgDTO.getRecurrDay() +
            "|" + reqMsgDTO.getNoOfRecurring() +
            "|" + reqMsgDTO.getResponseUrl() +
            "|" + reqMsgDTO.getAddField1() +
            "|" + reqMsgDTO.getAddField2() +
            "|" + reqMsgDTO.getAddField3() +
            "|" + reqMsgDTO.getAddField4() +
            "|" + reqMsgDTO.getAddField5() +
            "|" + reqMsgDTO.getAddField6() +
            "|" + reqMsgDTO.getAddField7() +
            "|" + reqMsgDTO.getAddField8() +
            "|" + reqMsgDTO.getAddField9() +
            "|" + reqMsgDTO.getAddField10() +
            "|" + reqMsgDTO.getPayTypeCode() +
            "|" + reqMsgDTO.getCardNumber() +
            "|" + reqMsgDTO.getExpiryDate() +
            "|" + reqMsgDTO.getCvv() +
            "|" + reqMsgDTO.getNameOnCard() +
            "|" + reqMsgDTO.getNetBankCode();
        // console.log(merchantReqStr)
        // var vTransactSecurity = new VTransactSecurity();

        var enc_data = vTransactSecurity.encryptValue(merchantReqStr, reqMsgDTO.getEnckey());
        // console.log(enc_data)

        reqMsgDTO.setReqMsg(enc_data);
        reqMsgDTO.setStatusDesc("Success");

    } catch (ex) {

        reqMsgDTO.setStatusDesc("Error Occured during gerating request message " + ex);


    }
    return reqMsgDTO;
}

module.exports = AWLMEAPI;

// }