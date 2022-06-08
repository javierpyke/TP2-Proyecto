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

app.patch('/products/:id', async (req,res) => {
  console.log(req.body)
  if(req.body.data.discount){
    if(req.body.data.discount <= 100){
      let discount = req.body.data.discount
      let product = await Product.findByPk(req.params.id);
      if(product){
        console.log("oldprice:"+product.price)
        let newPrice = (100-discount) * product.price / 100
        console.log("newPrice:"+newPrice)
        let ret = await product.update({ price: newPrice })
        res.status(200)
        res.json(ret)
        /* otra forma de hacerlo:
        product.price = newPrice
        await product.save() */
      }else{
        res.status(404)
        res.send("No Content")  
      }
    }else{
      res.status(400)
      res.send("Bad Request")
    }
  }else{
    res.status(400)
    res.send("Bad Request")
  }
})

app.post('/products', async (req,res) => {
    if(req.body.productName && req.body.description && req.body.category && req.body.productCode && req.body.price){

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