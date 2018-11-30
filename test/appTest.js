const chai = require('chai');
const assert = require('chai').assert;
const server = require('../server')
const request = require("request");
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const base_url = "http://localhost:5010/api/v1/users";
const redflag_url = "http://localhost:5010/api/v1/red-flags";
const redflag = require('../routes/api/redflag');
const url =  "http://localhost:5010";


// GET - List all colors
describe('iReporter', function(){
    describe("GET /", function() {
      it("Root page returns status code 200", function(done) {
        request.get(base_url, function(error, response, body) {
          assert.equal(200, response.statusCode);
          done();
        });
      });
    });
  
    describe("GET /redflags", function() {
      it("About page returns status code 200", function(done) {
        request.get(redflag_url, function(error, response, body) {
          assert.equal(200, response.statusCode);
          done();
        });
      });
    });

    describe("POST /redflag", function(){
        it('should add a new red flag record if details are correct', (done) => {
            chai
              .request(redflag)
              .post('localhost:5010/api/v1/red-flags')
              .send({
                id: 23,
                createdOn: new Date().toLocaleString(),
                createdBy: 90,
                title: "Bribery case",
                type: 'red-flag',
                location: '6.5323008-lat  3.3292287999999997-long',
                status: 'under-investigation',
                comments: 'Bribery case story'
            })
              .end((err, res) => {
                expect(200);
                expect(res.body).to.be.an('object');
                done(err);
              });
          });
    })
  });