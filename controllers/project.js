var Project = require('../models/Project');
exports.getMakeProject = function(req, res) {
  res.render('project/makeProject', {
    title: 'Create Project'

  });
};

/**
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
    user_leader: req.user.id,
    user_project_description: req.body.user_project_description,
    tags: req.body.tags,
    term: req.body.term,
    make_public: req.body.make_public
    
});
  newProject.save(function(err) {
      if (err) return next(err);
      res.redirect('/');
    });



};

exports.getProjListings = function(req, res) {
    Project.find(function(err, docs) {
            res.render('project/projListings', { projects: docs});
        });
};