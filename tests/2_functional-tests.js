const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);
  suite('Integration tests with chai-http', function () {
    // #1
    test('Test GET /hello with no name', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/hello')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Guest');
          done();
        });
    });
    // #2
    test('hello xwerty', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/hello?name=xwerty')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello xwerty');
          done();
        });
    });
    // #3
    test('send {surname: "Colombo"}', function(done) {
      // we setup the request for you...
      chai
        .request(server)
        .put('/travellers')
        /** send {surname: 'Colombo'} here **/
        .send({ surname: 'Colombo' })
        // .send({...})
        .end(function(err, res) {
          /** your tests here **/
          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(res.type, 'application/json', 'Response should be json');
          assert.equal(
            res.body.name,
            'Cristoforo',
            'res.body.name should be "Christoforo"'
          );
          assert.equal(
            res.body.surname,
            'Colombo',
            'res.body.surname should be "Colombo"'
          );
    
          done(); // Never forget the 'done()' callback...
        });
    });
    // #4
    test('Send {surname: "da Verrazzano"}', function (done) {
      chai
      .request(server)
      .put('/travellers')
      .send({ surname: 'da Verrazzano' })
      .end(function(err, res) {
      
      assert.equal(res.status,200);
      assert.equal(res.type,'application/json');
      assert.equal(res.body.name,'Giovanni');
      assert.equal(res.body.surname,'da Verrazzano');
      
      done();
    });
      
    });
  });
});

const Browser = require('zombie');
Browser.site = 'https://3000-freecodecam-boilerplate-1ccn3tqi60n.ws-us110.gitpod.io';
const browser = new Browser();
suite('Functional Tests with Zombie.js', function() {
  this.timeout(5000);
  
  suiteSetup(function(done) {
    return browser.visit('/', done);
  });
 
  suite('Headless browser', function() {
    test('should have a working "site" property', function() {
      assert.isNotNull(browser.site);
    });
  });
   
  suite('"Famous Italian Explorers" form', function () {
    // #5
    test('submit "surname" : "Colombo" - write your e2e test...', function(done) {
      browser.fill('surname', 'Colombo').then(() => {
        browser.pressButton('submit', () => {
        browser.assert.success();
        browser.assert.text('span#name', 'Cristoforo');
        browser.assert.text('span#surname', 'Colombo');
        browser.assert.elements('span#dates', 1);
    
        done(); 
        });
      });
    });
    // #6
    test('submit "surname" : "Vespucci" - write your e2e test...', function(done) {
      browser.fill('surname', 'Vespucci').then(() => {
        browser.pressButton('submit', () => {
        browser.assert.success();
        browser.assert.text('span#name', 'Amerigo');
        browser.assert.text('span#surname', 'Vespucci');
        browser.assert.elements('span#dates', 1);
    
        done();
        });
       });
      });
    });
});
