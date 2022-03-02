//you are going to need fs, util (util includes a promis function that makes  the functiion inside it asynchronous)
const fs = require('fs');
const util = require('util');
// const readAsync = util.promisify();
const path = require('path')


// aysnc processes
const readfileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//the fucntions that need to be async will be the read and write functions that read from db.json and write to db.json


// const 

// class DB{
// read(){
//     return readAsync()
// }
// }
// module.exports = new DB();