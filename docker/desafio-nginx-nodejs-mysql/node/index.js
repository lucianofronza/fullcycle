const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'PEOPLEDB'
};
const mysql = require('mysql')

app.get('/', (req,res) => {    
    const connection = mysql.createConnection(config)
    connection.query("select name from people", function (err, result, fields) {
        if (err) {
            console.error(err)
        } else {
            var list = ''
            Object.keys(result).forEach(function(key) {
                var row = result[key];
                list = list + '<br/>- ' + row.name
            });
            
            console.log('List', list)
            connection.end()
            res.send('<h1>Full Cycle Rocks!!!!</h1>' + list)        
        }
      });
})

app.listen(port, ()=> {
    console.log('Servidor ativo na porta: ' + port)
})