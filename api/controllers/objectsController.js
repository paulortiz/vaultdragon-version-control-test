var mongoose = require('mongoose');
var helper = require('../utils/helper');
var moment = require('moment');
var Objects = mongoose.model('Objects');

exports.list_all_objects = function(req, res) {
    try {
        var projection = {__v: false, _id : false};
    
        Objects.find({}, projection, function(err, object) {
            if (err) res.send(err);
            res.json(object);
        })
    } catch (err) {
        console.error("Failed to list all objects :: ", err);
    }
};

exports.create_a_object = function(req, res) {
    try {
        var objects = new Objects;
        var jsonObject = getObjectFromRequest(req);
        var timestamp = new Date().getTime();

        objects.key = jsonObject.key;
        objects.value = jsonObject.value;
        objects.timestamp = timestamp;

        objects.save(function(err, object) {
            if (err) res.send(err);
            var jsonResponse = getJsonFromObject(object);
            res.json(jsonResponse);
        });
    } catch (err) {
        console.error("Failed to create new object :: ", err);
    }
};

exports.read_a_object = function(req, res) {
    try {        
        var key = req.params.key;
        var condition = {key : key};
        var projection = {__v: false, _id : false};
        var sort = {sort : { 'timestamp' : -1 }};
        var timestamp = req.query.timestamp;

        console.log("Reading an Object :: key :: ", key);

        if (timestamp !== undefined && timestamp !== null) {
            console.log("time stamp give :: ", timestamp);
            condition = { key : key, '$where' : 'this.timestamp <= ' + timestamp }
        }        

        Objects.findOne(condition, projection, sort, function(err, object) {
            if (err) res.send(err);
            var jsonResponse = getJsonFromObject(object);
            res.json(jsonResponse);
        });
    } catch (err) {
        console.error("Failed to read object :: ", err);
    }
};

var getObjectFromRequest = function(request) {    
    var key = "";
    var value = "";

    try {
        var body = request.body;

        for (var _key in body) {
            key = _key;
            value = body[_key];        
        }
    } catch (err) {
        console.error("Failed to get request object from request body :: ", err);
    }

    return { key : key, value : value };
}

var getJsonFromObject = function(object) {
    var key = "",
        value = "",
        time = "";
        json = {};

    try {
        key = object.key;
        value = object.value;
        var date = new Date(object.timestamp);
        time = moment(date, 'ddd DD-MMM-YYYY, hh:mm A').format('hh:mm a') ;

        json = {
            key : key,
            value : value,
            timestamp: time
        };
    } catch (err) {}

    return json;
}