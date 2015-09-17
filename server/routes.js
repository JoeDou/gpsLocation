var handler = require('./handler.js');

var connectRoutes = function(expressApp) {
    expressApp.post('/upload', function (req, res) {
        handler.upload(req, res);
    });

    expressApp.all('*', function (req, res) {
        res.status(404).send('bad route');
    });
};

exports.connectRoutes = connectRoutes;
