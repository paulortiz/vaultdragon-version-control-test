var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObjectSchema = new Schema({
    key: String, 
    value: Object,    
    timestamp: Number
});

module.exports = mongoose.model('Objects', ObjectSchema);