const { assert } = require('chai');
const axios = require('axios');
require('dotenv').config(); 

let params = 
{ 
    headers: {},
    data: {
        id: 16
    }

}

describe('Deletion methods ',()=>{
    it('Should delete the product ', (done) => {
        axios.delete(process.env.DOMAIN+"/products",params)
        .then((res) => {
            //console.log(res.data)
            assert.equal(res.status,200,'Status is 200')
            done()
        }).catch((err) => {
            //console.log(err)
        })
    });

    it('Should get an error if the product does not exists (Status 404)', (done) => {
        params.data.id = -1
        axios.delete(process.env.DOMAIN+"/products",params)
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