const CryptoJS = require("crypto-js");


async function CryptingTextSALT(Text){

    return CryptoJS.SHA256(Text).toString();

}


module.exports = CryptingTextSALT;