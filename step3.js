const fs = require('fs');
const process = require('process');
const axios = require('axios');

let source = null;
let writeFileName = null;
if (process.argv.length === 3){
    source = process.argv[2];
}
else if(process.argv.length === 5 && process.argv[2] === '--out'){
    writeFileName = process.argv[3];
    source = process.argv[4];
}
else{
    process.exit(1);
}

function cat(path, fName){
    let d = null;

    fs.readFile(path, 'utf8', (error, data) => {
        if (error){
            console.log(error);
            process.exit(1);
        }
        else{
            d = data;
        }

        if (fName){
            writeFile(fName, d);
        }
        else{
            console.log(d);
        }
    });
}

async function webCat(url, fName){
    let data = null;

    try{
        const response = await axios.get(url);
        data = response.data;
    }
    catch(error){
        console.log(error.name);
        console.log(error.message);
        process.exit(1);
    }

    if (fName){
        writeFile(fName, data);
    }
    else{
        console.log(data);
    }
}

function writeFile(fName, data){
    fs.writeFile(fName, data, (error) => {
        if (error){
            console.log(error.name);
            console.log(error.message);
            process.exit(1);
        }
    });
}

if (source.slice(0, 4) === 'http'){
    webCat(source, writeFileName);
}
else{
    cat(source, writeFileName);
}
