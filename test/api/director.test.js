const chai =require('chai');
const assert = chai.assert;    // Using Assert style
const expect = chai.expect;    // Using Expect style
const should = chai.should();  // Using Should style

const chaiHttp = require('chai-http');
const server = require('../../app');
chai.use(chaiHttp);

let token,directorId;

describe('/api/Director tests', ()=> {
    before((done)=>{
        chai.request(server)
         .post('/authenticate')
         .send({username:'yekbun', password:'12345'})
         .end((err, res) => {
             token = res.body.token;
             done();
       });
    });
 
    describe('/GET all directors',()=>{
        it('Get all directors records', (done) => {
            chai.request(server)
            .get('/api/directors')
            .set('x-access-token', token)
            .end((err, res)=>{
                if(err)
                    throw err;
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            })
        })
    })

    describe('/POS a director', ()=> {
        it('should add a director',(done)=> {
            const director={
                name:'Avsin',
                surname:'Olcay',
                bio:'She like game, cycling, fating'
            }
            chai.request(server)
            .post('/api/directors')
            .send(director)
            .set('x-access-token', token)
            .end((err,res)=>{
                console.log('TEST:'+res);

                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');                
                res.body.should.have.property('surname');
                res.body.should.have.property('bio');
                directorId = res.body._id;                
               done();
            })

        });
    });

    describe('/:director_id',()=>{
        it('should update the director with new data', (done)=>{
            const director={
                name:'Avsin 1',
                surname:'Olcay 1',
                bio:'Travel adn something like that . He like also u=ivir zivir'
            }

            chai.request(server)
            .put('/api/directors/'+directorId)      
            .set('x-access-token', token)
            .send(director)
            .end((err,res)=>{
                if(err)
                    throw err;

                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name').eql(director.name);
                res.body.should.have.property('surname').eql(director.surname);
                res.body.should.have.property('bio').eql(director.bio);
                done();
            });
        });
    });

    describe('/DELETE director by id',()=>{
        it('should delete the director which has the director_id', (done)=>{
            chai.request(server)
                .delete('/api/directors/'+directorId)
                .set('x-access-token', token)
                .end((err, res)=>{
                    if(err)
                        throw err;

                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(1);
                    done();
                })

        })
    })

})