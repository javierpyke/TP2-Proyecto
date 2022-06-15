const { assert } = require('chai');
const axios = require('axios');

let testproduct = 
{ 
    productName: "Par de cubiertos",
    description: "Juego de cubiertos metalicos",
    category: 3,
    productCode: "Cubi0003Met",
    price: 888.50
};

describe('Posting products: ',()=>{
    it('Should recieve the product from the DB', (done) => {
    axios.post(process.env.DOMAIN+"/products",testproduct)
        .then((res) => {
            //console.log(res.data)
            assert.equal(res.data.productCode,testproduct.productCode,'Response contains the product sent')
            //assert.equal(res.status,201,'Status is 201')
            done()
        }).catch((err) => {
            //console.log(err)
        })
    });

    it('Should get an error if posting the same product (Status 422)', (done) => {
    axios.post(process.env.DOMAIN+"/products",testproduct)
        .then((res) => {
            //assert.equal(res.status,422,'Status is 422')
            //done()
        }).catch((err) => {
            assert.equal(err.response.status,422,'Status is 422')
            done()
        })
    });
});