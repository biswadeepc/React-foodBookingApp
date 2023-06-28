const request = require("supertest");
const assert = require("assert");
const app = require("../index");

// making a GET request to the app
describe("GET /", () => {
  it("it should has status code 200", (done) => {
    request(app)
      .get("/")
      .expect(200)
      .end(function(err, res){
        if (err) done(err);
        done();
      });
  });
});

// making a GET request to the about page
describe("GET /about", () => {
    it("About page has status code 200", (done) => {
        request(app).get("/about").expect(200).end((err,res)=>{
            if(err) done(err);
            done();
        });
    })
});