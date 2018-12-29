const chai = require('chai');  
const assert = chai.assert;    // Using Assert style
const expect = chai.expect;    // Using Expect style
const should = chai.should();  // Using Should style

const chaiHttp = require('chai-http');

const server = require('../../app');
chai.use(chaiHttp);

describe('Node Server',()=>{
    it('(GET /) return manin page', (done)=>{
        chai.request(server)
        .get('/')
        .end((err, res)=>{
            res.should.have.status(200)
            done();
        })
    })

})