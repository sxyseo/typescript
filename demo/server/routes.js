/**
 * Module dependencies.
 */
var user = require('./user'); // default index.js
// more controllers define here.
// ...

module.exports = function (app) {
  
  // upload
  app.post('/upload', user.upload);

  // 404 page warn: must in the last
  // app.get('*', function (req, res) {
  //   res.send('404 page');
  // });
};

