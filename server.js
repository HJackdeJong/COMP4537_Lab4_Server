const http = require('http');
const url = require('url');
import MESSAGES from './lang/messages/en/user.js'
const Dictionary = require('./modules/dictionary');

const PORT = 3000;
const dictionary = new Dictionary();

const server = http.createServer((req, res) => {

    const parsedUrl =  url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    //getting a word from the dictionary
    if (pathname='/add/definitions' && req.method =='GET'){
        const word = query.word;

        //check is there is a word send
        if (!word){

            res.writeHead(400);
            res.end(JSON.stringify({message: MESSAGES.noWord}))
        }

        // retrieve the word
        dictionary.retrieveDefinition(word);

        // set the headers and send back the word and the definition

        // 
    
    // adding a word to the dictionary
    }else if (pathname='/add/definitions' && req.method =='GET'){

        //increment the number of requests sent

        //attempt to add the word
        if (isInDictionary(word)){

            //prep and send back a response

        } else{
            //add the word, this increments the counter and should return a value

            // send back the response 


        }
    }
})