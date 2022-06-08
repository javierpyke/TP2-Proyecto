const { assert } = require('chai');
const axios = require('axios');

let testproduct = {};
let params = {headers: {}, data: { discount: 10 }};
describe('Apply 10% discount to product: ',()=>{
    it('Should get discounted price', (done) => {
        axios.get("http://127.0.0.1:8080/products/1")
        .then((res) => {
            testproduct = res.data
            /*console.log("params: ")
            console.log(params)
            console.log("OldProduct: ")
            console.log(testproduct)*/
            axios.patch("http://127.0.0.1:8080/products/1", params).then((res) => {
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
});

describe('Fail to Apply 110% discount to product: ',()=>{
    it('Should get 400 (bad request)', (done) => {
        axios.get("http://127.0.0.1:8080/products/1")
        .then((res) => {
            testproduct = res.data
            params.data.discount = 110
            axios.patch("http://127.0.0.1:8080/products/1", params).then((res) => {
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
