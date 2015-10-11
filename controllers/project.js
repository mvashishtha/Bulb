var Project = require('../models/Project');
var User = require('../models/User');
var secrets = require('../config/secrets');

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
  
  if (req.body.title == "") {
      return res.redirect('/post');
  }

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/post');
  }

  var newProject = new Project({
    user_leader: req.user.id,
    user_mem_list: [req.user.id],
    user_project_description: req.body.user_project_description,
    tags: req.body.tags,
    term: req.body.term,
    title: req.body.title,
    make_public: req.body.make_public || false
    
    
});
  req.user.proj_lead.push(newProject);
  req.user.save(function(err){
    if (err) return next(err);
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

exports.postProjListings = function(req, res) {
    
     var query = Project.where({title: req.body.chosen_project});
    query.findOne(function (err, kitten) {
            if (err) return res.redirect('/');
            if (kitten) {
                usr_names = [];
                for (usr_id in kitten.user_mem_list) {
                    query = User.where({id: usr_id});
                    query.findOne(function (err, puppy) {

                            usr_names.push(puppy.name);
                        });
                }
                res.render('project/projPage', {in_project: kitten, in_names: usr_names});                
            }
            else {
                res.redirect('/projpostings');
            }
        });     
}