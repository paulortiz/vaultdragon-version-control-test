module.exports = function() {
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
};