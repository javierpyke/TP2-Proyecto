const { assert } = require('chai');
const axios = require('axios');
require('dotenv').config();


describe('Api Testing', function () {
    let testproduct,controlproduct
    before(function () {
        controlproduct = 
        { 
            productName: "Par de cubiertos",
            description: "Juego de cubiertos metalicos",
            category: 3,
            productCode: "Cubi0001Met",
            price: 10000
        };       
    });

    //POST METHODS
    describe('Posting products: ',()=>{
        it('Should recieve the product from the DB', (done) => {
        axios.post(process.env.DOMAIN+"/products",controlproduct)
            .then((res) => {
                //console.log(res.data)
                testproduct = res.data
                assert.equal(res.data.productCode,controlproduct.productCode,'Response contains the product sent')
                //assert.equal(res.status,201,'Status is 201')
                done()
            }).catch((err) => {
                //console.log(err)
            })
        });
    
        it('Should get an error if posting the same product (Status 422)', (done) => {
        axios.post(process.env.DOMAIN+"/products",controlproduct)
            .then((res) => {
                //assert.equal(res.status,422,'Status is 422')
                //done()
            }).catch((err) => {
                assert.equal(err.response.status,422,'Status is 422')
                done()
            })
        });
    });

    //PATCH METHODS
    describe('Applying discounts to products: ',()=>{
        it('Should get discounted price', (done) => {
            axios.get(process.env.DOMAIN+"/products/"+testproduct.id)
            .then((res) => {
                let testproduct = res.data
                /*console.log("params: ")
                console.log(params)
                console.log("OldProduct: ")
                console.log(testproduct)*/
                axios.patch(process.env.DOMAIN+"/products/"+testproduct.id, {data:{discount:10}} ).then((res) => {
                    /*console.log("response: ")
                    console.log(res)*/
                    let exprectedPrice = testproduct.price*0.9;
                    assert.equal(exprectedPrice,res.data.price,'Discounted have to be '+exprectedPrice)
                    done()
                }).catch((err) => {
                    console.log(err.response)
                })
            }).catch((err) => {
                console.log(err)
            })
        });
    
        it('Should get an error applying 110% discount (400 bad request)', (done) => {
            axios.get(process.env.DOMAIN+"/products/"+testproduct.id)
            .then((res) => {
                testproduct = res.data
                //paramsDisc.data.discount = 110
                axios.patch(process.env.DOMAIN+"/products/"+testproduct.id, {data:{discount:110}}).then((res) => {
                    assert.equal(res.status,400,'Status is 400')
                    done()
                }).catch((err) => {
                    //console.log(err.response)
                    assert.equal(err.response.status,400,'Status is 400')
                    done()
                })
            }).catch((err) => {
                console.log(err)
            })
        });
    });

    //GET METHODS
    describe('Getting products: ',()=>{
        it('Should get all products', (done) => {
        axios.get(process.env.DOMAIN+"/products")
            .then((res) => {
                //console.log(res.data)
                //testproduct=res.data[0]
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

    //DELETE METHODS
    describe('Deletion methods ',()=>{
        it('Should delete the product ', (done) => {
            axios.delete(process.env.DOMAIN+"/products",{data: {id : testproduct.id}})
            .then((res) => {
                //console.log(res.data)
                assert.equal(res.status,200,'Status is 200')
                done()
            }).catch((err) => {
                //console.log(err)
            })
        });
    
        it('Should get an error if the product does not exists (Status 404)', (done) => {
            axios.delete(process.env.DOMAIN+"/products",{data: {id : -1}})
            .then((res) => {
                //assert.equal(res.status,422,'Status is 422')
                console.log(res)
                //done()
            }).catch((err) => {
                //console.log(err.response)
                assert.equal(err.response.status,404,'Status is 404')
                done()
            })
        });
    
    });
});