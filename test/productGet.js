const { assert } = require('chai');
const axios = require('axios');

let testproduct;

describe('Get all products: ',()=>{
    it('Should get all products', (done) => {
    axios.get("http://127.0.0.1:8080/products")
        .then((res) => {
            //console.log(res.data)
            testproduct=res.data[0]
            assert.equal(res.status,200,'Status is 200')
            //assert.isAtLeast(res.data.length,1,'At least lists 1 product')
            done()
        }).catch((err) => {
            console.log(err)
        })
    });

});

describe('Get a single product: ',()=>{
    it('Should get a product', (done) => {
    axios.get("http://127.0.0.1:8080/products/"+testproduct.id)
        .then((res) => {
            //console.log(res.data)
            //assert.equal(res.status,200,'Status is 200')
            assert.exists(res.data,'Contains 1 product')
            done()
        }).catch((err) => {
            console.log(err)
        })
    });

});

describe('Dont get any product: ',()=>{
    it('Should NOT get a product', (done) => {
    axios.get("http://127.0.0.1:8080/products/0")
        .then((res) => {
            console.log(res.data)
            //assert.equal(res.status,204,'Status is 204')
            assert.exists(res.data,'Does NOT contains a product')
            done()
        })
    });

});