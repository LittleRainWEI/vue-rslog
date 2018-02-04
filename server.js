const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const mysql = require('mysql')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
//the cores config
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')

    if (req.method == 'OPTIONS') {
        res.send(200)
        //make the require of options turn back quickly
    } else {
        next()
    }
});

app.listen(8090, () => {
    console.log("nodejs正在监听8090端口")
});

//deal (cookie,session)
(() => {
    app.use(cookieParser())
    let keyArr = []
    for (let i = 0; i < 100000; i++) {
        keyArr[i] = "xsa_" + Math.random() * 100 + i
    }
    app.use(cookieSession({
        name: "hc",
        keys: keyArr,
        maxAge: 30 * 60 * 1000
    }))
})();

//deal router
app.use('/', require('./api/index.js')());
