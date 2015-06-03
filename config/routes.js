var path = require('path');

module.exports = function(app, express) {
  var adminRouter = express.Router();

  adminRouter.get('*', function(req, res) {
    res.sendFile('index'));
  });

  app.use('/admin', adminRouter);
}
