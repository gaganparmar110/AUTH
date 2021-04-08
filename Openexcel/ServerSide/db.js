const Pool = require('pg').Pool;
const connection = new Pool({
    user : "postgres",
    password : "root",
    host : "localhost",
    port : 5432,
    database : "UserDb"
});

connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log("Error while connecting with database");
}
});
module.exports = connection;