const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path){
    fs.readFile(path, 'utf8', (error, data) => {
        if (error){
            console.log(error);
        }
        else{
            console.log(data);
        }
    });
}

async function webCat(url){
    try{
        const response = await axios.get(url);
        console.log(response.data);
    }
    catch(error){
        console.log(error.name);
        console.log(error.message);
    }
}

if (process.argv[2].slice(0,4) === 'http'){
    webCat(process.argv[2]);
}
else{
    cat(process.argv[2]);
}
