const CryptoJS = require("crypto-js");


function CryptingText(Text){

    console.log("CryptingTextSALT function");

    return CryptoJS.SHA256(Text).toString();

}


module.exports = CryptingText;