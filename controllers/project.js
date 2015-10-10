
exports.getMakeProject = function(req, res) {
  res.render('project/makeProject', {
    title: 'Create Project'

  });
};

/**
<<<<<<< HEAD
 * POST /signup
 * Create a new local account.
 */
exports.postMakeProject = function(req, res, next) {
  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/makeproject');
  }

  var newProject = new Project({
    user_leader: req.user,
    tags: req.body.tags,
    term: req.body.term,
    make_public: req.body.make_public
})



};