const express = require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const puerto = 8080
const server = app.listen(puerto)

server.on('listening', () => { console.log('conectado!') })
server.on('error', error => { console.log(error.message) })

const Routes = require('./config/route-config');
app.use('', Routes);

console.log(`Running on http://localhost:${puerto}`);