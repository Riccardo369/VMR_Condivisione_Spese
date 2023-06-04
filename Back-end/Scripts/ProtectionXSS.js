const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const DOMPurify = createDOMPurify(new JSDOM('').window);

//Sanifica una stringa da codice eseguibile DOM
async function StringSanitized(String){

    return DOMPurify.sanitize(String);

}

module.exports = {StringSanitized};