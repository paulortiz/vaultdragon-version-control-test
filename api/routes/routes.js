module.exports = function(app) {
    var controller = require('../controllers/objectsController');

    app.route('/object')
        .get(controller.read_latest_object)
        .post(controller.create_a_object)

    app.route('/object/:key')
        .get(controller.read_a_object)     
}