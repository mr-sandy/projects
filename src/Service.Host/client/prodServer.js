const express = require('express');
const path = require('path');
const pug = require('pug');

const app = express()

app.set('view engine', 'pug')
app.use('/register/build', express.static(path.join(__dirname, 'build')))
app.use('/register/assets', express.static(path.join(__dirname, 'assets')))

const htmlPaths = [
    '/register',
    '/register/success',
    '/password-reset*',
    '/verify/*'
];

app.get(htmlPaths, function (req, res) {
    res.render('index', { wwwRoot: process.env.WWW_ROOT })
});

app.listen(3000, () => console.log('Production server listening on port 3000'))