const { assert } = require('chai');
const axios = require('axios');

let testproduct;

describe('Getting products: ',()=>{
    it('Should get all products', (done) => {
    axios.get(process.env.DOMAIN+"/products")
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

    it('Should get a single product', (done) => {
    axios.get(process.env.DOMAIN+"/products/"+testproduct.id)
        .then((res) => {
            //console.log(res.data)
            //assert.equal(res.status,200,'Status is 200')
            assert.exists(res.data,'Contains 1 product')
            done()
        }).catch((err) => {
            console.log(err)
        })
    });

    it('Should NOT get a product', (done) => {
    axios.get(process.env.DOMAIN+"/products/0")
        .then((res) => {
            //console.log(res.data)
            assert.equal(res.status,404,'Status is 404')
            //assert.exists(res.data,'Does NOT contains a product')
            done()
        }).catch((err) => {
            //console.log(err)
            assert.equal(err.response.status,404,'Status is 404')
            done()
        })
    });

});