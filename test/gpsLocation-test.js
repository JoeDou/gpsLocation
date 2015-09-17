var expect = require("chai").expect;
var request = require('supertest');
var express = require('express');
var bodyParser = require('body-parser');

var helper = require('../server/helper.js');
var routes = require('../server/routes.js');
var handler = require('../server/handler.js');

var expressApp = express();
expressApp.use(bodyParser.json());
expressApp.use(express.static(__dirname+'/../public/'));
routes.connectRoutes(expressApp);

describe('base links via API', function() {
    it('should hit root respond 200', function(done) {
        request(expressApp)
            .get('/')
            .set('Accept', 'application/json')
            .expect(200)
            .end(done);
    });

    it('should hit bad rout respond 404', function(done) {
        request(expressApp)
            .get('/badroute')
            .set('Accept', 'application/json')
            .expect(404)
            .end(done);
    });
});

describe('helper function', function(){
    it('should convert degrees to radians',function(){
        var degree = 23;
        var radian = helper.toRadians(degree);
        expect(radian).to.equal(23*Math.PI/180);
    });

    it('should calculate distance between to GPS coordinate',function(){
        var point1 = {
            latitude: 53.3381985,
            longitude: -6.2592576
        };
        var point2 = {
            latitude: 52.833502,
            longitude: -8.522366
        };
        var distance = helper.calculateDistance(point1, point2);
        expect(distance).to.equal(161216.7429172983);
    });

    it('should parse and calculate distance',function(){
        var input = {
            latitude: 53.3381985,
            longitude: -6.2592576,
            distance: 100
        };
        dataStr = '{"latitude": "52.986375", "user_id": 12, "name": "Christina McArdle", "longitude": "-6.043701"}\n' +
                  '{"latitude": "51.92893", "user_id": 1, "name": "Alice Cahill", "longitude": "-10.27699"}\n' + 
                  '{"latitude":"53.2451022","user_id":4,"name":"Ian Kehoe","longitude":"-6.238335"}';

        var retObj =  helper.parseData(dataStr, input);

        expect(retObj[0].user_id).to.equal(4);
        expect(retObj[0].name).to.equal("Ian Kehoe");
        expect(retObj[1].user_id).to.equal(12);
        expect(retObj[1].name).to.equal("Christina McArdle");
    });
});
