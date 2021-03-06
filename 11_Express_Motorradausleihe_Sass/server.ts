import { create } from 'express-handlebars'
import express = require('express')
import session = require('express-session')
import sass = require('node-sass-middleware')

//muss in der index.ts zuerst einzeln importiert und dann gemeinsam exportiert werden
import {
    Kunden,
    Motorrad
} from './routes'

//Alternative als Einzelimport
//import {Kunden} from './kunden'
//import {Motorrad} from './routes/motorrad'


const app = express()

const hbsOptions : ExphbsOptions = {
    defaultLayout:'main',
    extname:".hbs",
}

const hbs = create(hbsOptions)

app.engine('hbs',hbs.engine).set('view engine','hbs')


app.use(session({
    secret: "made by Me",
}))


app.use(
    sass({
        src: __dirname + '/sass', 
        dest: __dirname + '/public', 
        debug: true,
        outputStyle: 'compressed', 
    }),
    express.static('public'),
    express.static('static'),
    express.urlencoded({extended:false})
)

//Wenn Handlebars, Sessions usw. vorher hier genutzt werden, dann muss man sie nicht in die einzelnen Routes einpflegen
//gilt nicht für DB-Zugriff
app.use(
    Motorrad,
    Kunden
)


app.get('/', (req,res)=>{
    const session = req.session as Express.Session
    res.render('start',{ 
        kunde: session.kunde})
})


//########################################################################
//   Starten der Datenverarbeitung an port 3000
//########################################################################

const port = 3000
app.listen(port,()=>{
    console.log(`
        Server wurde gestartet
        url: http://localhost:${port} 
    `)
})


