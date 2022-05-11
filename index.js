const express = require('express')

const app = express()
app.use(express.json())

const puerto = 8080
const server = app.listen(puerto)

server.on('listening', () => { console.log('conectado!') })
server.on('error', error => { console.log(error.message) })

app.get('/', (req, res) => {
    res.send('Hello World!!')
  })

  console.log(`Running on http://localhost:${puerto}`);