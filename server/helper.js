var _          = require('lodash');

var EARTH_RADIUS = 6371000;

var parseData = function(dataStr, input){
    var userArr = dataStr.split('\n');
    var retArr =[];
    var office = {
        latitude: input.latitude,
        longitude: input.longitude
    };

    var maxDistance = input.distance * 1000;
    console.log('office: ' + JSON.stringify(office));
    console.log('max distance: ' + maxDistance);

    _.each(userArr, function(user){
        var userObj = JSON.parse(user);
        var distance = calculateDistance(office, userObj);
        if (distance <= maxDistance){
            retArr.push(userObj);
        }
    });

    retArr.sort(function(a,b){
        if (a.user_id > b.user_id){
            return 1;
        } else if (a.user_id < b.user_id) {
            return -1;
        }
        return 0;
    });

    return retArr;
};

var calculateDistance = function(office, user) {
    // set values
    var earthRadius = EARTH_RADIUS; // meters
    var latRad1 = toRadians(office.latitude);
    var latRad2 = toRadians(user.latitude);
    var lonRad1 = toRadians(office.longitude);
    var lonRad2 = toRadians(user.longitude);
    var deltaLat = (latRad2-latRad1);
    var deltaLon = (lonRad2-lonRad1);

    var angle = (Math.sin(deltaLat/2) * Math.sin(deltaLat/2)) +
            (Math.cos(latRad1) * Math.cos(latRad2) *
            Math.sin(deltaLon/2) * Math.sin(deltaLon/2));

    var centralAngle = 2 * Math.atan2(Math.sqrt(angle), Math.sqrt(1-angle));

    return earthRadius * centralAngle;
};

var toRadians = function(deg) {
    return deg *Math.PI/180;
};

exports.parseData = parseData;
exports.calculateDistance = calculateDistance;
exports.toRadians = toRadians;
