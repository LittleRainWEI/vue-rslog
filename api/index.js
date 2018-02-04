const express = require('express')
const mysql = require('mysql')
const db = mysql.createPool({
    host: '192.168.0.220',
    user: 'root',
    password: 'runstone',
    database: 'rslog_db2'
});

module.exports = () => {
    const route = express.Router();

    route.get('/api/dashboard/getDefThrendData', (req, res) => {
        let startTime = req.query.startTime;
        let endTime = req.query.endTime;
        console.log(startTime);
        console.log(endTime);

        const sqlStr = `select sum(count) as count, date2 as date from tbl_rslog_seller_count where date2 >= '${startTime}' and date2 < '${endTime}' group by date2`;
        db.query(sqlStr, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                let jsonData = {
                    xAxisData: [],
                    seriesData: []
                };
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        var tmpData = data[i];
                        jsonData.xAxisData.push(formatDate(tmpData.date));
                        jsonData.seriesData.push(tmpData.count + 0);
                    }
                }
                res.send(jsonData);
            }
        });
    });
    
    route.get('/api/test', (req, res) => {
        console.log('recieve request!!!');
        let username = req.query.username;
        console.log(username);
        const tmpSql = `SELECT * FROM tbl_rslog_user where username = '${username}'`;
        getResult(tmpSql, res);
    });

    function getResult(sqlStr, res) {
        db.query(sqlStr, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send('database err').end();
            } else {
                if (data.length == 0) {
                    res.status(500).send('no datas').end();
                } else {
                    res.send(data);
                }
            }
        });
    }

    function formatDate(time) {
        let tmpDate = new Date(time);
        let year = tmpDate.getFullYear();
        let month = tmpDate.getMonth();
        let date = tmpDate.getDate();
        let formatDate = year + "-" + (month > 8 ? "" : "0") + (month + 1) + "-" + (date > 9 ? "" : "0") + date;
        return formatDate;
    }

    return route;
}
