module.exports = function(app) {
    var controller = require('../controllers/objectsController');

    app.route('/object')
        .get(controller.list_all_objects)
        .post(controller.create_a_object)

    app.route('/object/:key')
        .get(controller.read_a_object)     
}