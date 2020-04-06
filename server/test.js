const fs = require('fs');
var config = require('./configDev.json');

let file;

fs.readFile('C:\\GitHub\\steady-gamma\\server\\configDev.json', 'utf8', (err, data) => {
    if (err) throw err;
    file = JSON.parse(data);
});
console.log("Contents are: " + file);


// fs.readFile('./configDev.json', 'utf8', (err, test) =>{
//     if (err) throw err;
//     file = JSON.parse(test);    
// });

console.log(config.port);