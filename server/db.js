

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'book',
});

connection.connect((err) => {
    if (err) {
        console.error('Błąd połączenia z bazą danych: ', err);
    } else {
        console.log('Połączono z bazą danych MySQL');
    }
});

module.exports = connection;
