const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const api = require('./data/series.json');

app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    runtimeOptions:{
        allowProtoMethodsByDefault: true,
        allowedProtoMethodsByDefault: true,
    }}))
app.set('view engine', 'handlebars');
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/home', function(req, res){
    res.render('series')
})

app.get('/series', function(req, res){
    res.send(`${req.body.titulo}`)
})

app.listen('3000', function(){
    console.log('Server ON')
})