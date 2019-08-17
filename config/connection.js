// Require mysql
const mysql = require('mysql')

if (process.env.JAWSDB_MAUVE_URL){
    // Database is JawsDB on Heroku
    connection = mysql.createConnection(process.env.JAWSDB_MAUVE_URL)
}else{
    connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'testdb',
    
});
}

module.exports = connection;
