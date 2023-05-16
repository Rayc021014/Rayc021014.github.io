var express = require('express');
var router = express.Router();


const sqlite = require('sqlite3').verbose();
db = new sqlite.Database("./db.sqlite", sqlite.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

router.post('/', (req, res) => {
    const {record_time, open_price, high_price, low_price, close_price, volume, volume_ma} = req.body;
    sql = "INSERT INTO price (record_time, open_price, high_price, low_price, close_price, volume, volume_ma) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.run(sql, [record_time, open_price, high_price, low_price, close_price, volume, volume_ma], (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send(err.message);
        }
        console.log('inserted');
    });
    //res.redirect('/data.html');
    return res.status(200).send('inserted');
})

router.get('/', function(req, res) {
    let data_url = req.url;
    /*
    /?col_name=record_time&comp=greater&comp_num=2023
    */
    let query_params = data_url.substring(2);
    let params_pair = query_params.split('&');
    //[ 'col_name=record_time', 'comp=greater', 'comp_num=2023' ]
    let sql_param = [];
    params_pair.forEach((d) => {
        let pair = d.split('=');
        sql_param.push(pair[1]);
    });
    //console.log(sql_param);

    sql= "SELECT * FROM price ";
    if (sql_param[0] && sql_param[1]  && sql_param[2]) {
        if (sql_param[1] === 'greater') {
            sql = "SELECT * FROM price  WHERE " + sql_param[0] + " > " + sql_param[2];
        } else {
            sql = "SELECT * FROM price WHERE " + sql_param[0] + " < " + sql_param[2];
        }
    }

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});


module.exports = router;