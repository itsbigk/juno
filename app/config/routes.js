module.exports = function(app, express) {
  var adminRouter = express.Router();

  adminRouter.get('*', function(req, res) {
    res.render('views/admin/index.html');
  });

  app.use('/admin', adminRouter);
}
