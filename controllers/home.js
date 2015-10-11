/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  res.render('home', {
    title: 'Home'
  });
};

exports.twenty = function(req, res) {
  res.render('twenty', {
    title: 'Landing Page'
  });
};

