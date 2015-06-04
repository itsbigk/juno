var path = require('path');

module.exports = function(app, express) {
  var apiRouter = express.Router();

  apiRouter.get('/restaurants', function(req, res) {

  });

  app.use('/api', apiRouter);

  app.get('*', function(req, res) {
    res.sendFile('index');
  });

}
