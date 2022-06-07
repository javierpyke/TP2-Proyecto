const express = require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const puerto = 8080
const server = app.listen(puerto)

server.on('listening', () => { console.log('conectado!') })
server.on('error', error => { console.log(error.message) })

const {Product} = require('./src/db/models')

app.get('/products', async (req,res) => {
  let data = await Product.findAll()
  
  if(data.length > 0){
    res.status(200)
    res.json(data)
  }else{
    res.status(404)
    res.send("No Content")
  }
  
})

app.get('/products/:id', async (req,res) => {
  let data = await Product.findByPk(req.params.id);
  if(data){
    res.status(200)
    res.json(data)
  }else{
    res.status(404)
    res.send("No Content")
  }
})

app.post('/products', async (req,res) => {
    if(req.body.productName && req.body.description && req.body.category && req.body.productCode){

      let productSearch = {
        productCode: req.body.productCode
      }

      let q = await Product.count({
        where: {
          ...productSearch
        }
      })

      if(q==0){

        let ret = await Product.create({
          ...req.body
        })
        res.status(201)
        res.json(ret.dataValues)
      }else{
        res.status(422)
        res.send("Ya existente")
      }
    }else{
      res.status(400)
      res.send("Faltan datos")
    }

})

app.delete('/products', async (req,res) => {
  if(req.body.id){
    
    let productToDelete = await Product.findByPk(req.body.id)

    if(productToDelete){
      
      await productToDelete.destroy()

      res.status(200)
      res.send("Eliminado")
    }else{
      res.status(404)
      res.send("No encontrado")
    }

  }else{
    res.status(400)
    res.send("Faltan datos")
  }
})

app.get('/products-create', async (req,res) => {
  await Product.create({
    productName: "Rexona MaxSports",
    description: "Desodorante Rexona 300ml - Duracion prolongada",
    category: 1,
    productCode: "AAA0001"
  })
  await Product.create({
    productName: "Rexona MasBlancos",
    description: "Desodorante Rexona 350ml - Blancos mas blancos",
    category: 1,
    productCode: "AAA0002"
  })
  res.status(201)
  res.send('Created')
})

app.get('/', (req, res) => {
    res.status(200)
    res.send('Hello World!!')
  })

  console.log(`Running on http://localhost:${puerto}`);