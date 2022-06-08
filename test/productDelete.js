const { assert } = require('chai');
const axios = require('axios');

let params = 
{ 
    headers: {},
    data: {
        id: 14
    }

}

describe('Delete a product: ',()=>{
    it('Should delete the product ', (done) => {
    axios.delete("http://127.0.0.1:8080/products",params)
        .then((res) => {
            //console.log(res.data)
            assert.equal(res.status,200,'Status is 200')
            done()
        }).catch((err) => {
            //console.log(err)
        })
    });

});

describe('Delete a non existing product: ',()=>{
    it('Should get an error (Status 404)', (done) => {
    params.data.id = -1
    axios.delete("http://127.0.0.1:8080/products",params)
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