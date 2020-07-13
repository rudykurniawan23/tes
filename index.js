const path = require('path');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

const conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'crud_db'
});

conn.connect((err) =>{
    if(err) throw err;
    console.log('MySQL Connected...');
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use('/assets', express.static(__dirname + '/public'));

//Homepage
app.get('/', (req, res) => {
    let sql = "SELECT * FROM tb_crud";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.render('task_view', {
            results : results
        });
    });
});

//route add data
app.post('/save', (req, res) => {
    let data = {task_list : req.body.task_list, task_sub : req.body.task_sub, task_status : req.body.task_status, task_selesai : req.body.task_selesai};
    let sql = "INSERT INTO tb_crud SET ?";
    let query = conn.query(sql, data, (err, results) => {
        if(err) throw err;
        res.redirect('/');
    });
});

//route all delete data
app.post('/deleteall', (req, res) => {
    let sql = "DELETE FROM tb_crud  WHERE task_status ='Finish'";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.redirect('/');
    });
});

//route update data
app.post('/update', (req, res) => {
    let sql = "UPDATE tb_crud SET task_status = '"+ req.body.task_status +"' WHERE task_id = "+ req.body.task_id;
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.redirect('/');
    });
});

//route delete data
app.post('/delete', (req, res) => {
    let sql = "DELETE FROM tb_crud  WHERE task_id = "+ req.body.task_id +"";
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.redirect('/');
    });
});

app.listen(8080, () => {
    console.log('Server is running at port 8080');
});