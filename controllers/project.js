var Project = require('../models/Project');
var secrets = require('../config/secrets');
var mongoose = require('mongoose');
mongoose.connect('mongodb://vashishtha.mahesh:pass2015calhacks@ds035240.mongolab.com:35240/bulb')

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
  req.user.proj_lead.push(newProject);
  req.user.save(function(err){
    if (err) return next(err);
  });
  newProject.save(function(err) {
      if (err) return next(err);
      res.redirect('/');
    });

};

exports.getProjectsList = function(req, res) {
  res.render('project/makeProject', {
    title: 'Create Project'

  });
  

  //mongoose.connect(secrets.db);
 // var db = mongoose.connection;
 // db.on('error', console.error);
  
 // db.once('open',function(callback) {
 //   collections = db.db.users;
//    collections.find({},{},function(e,docs){
  //    res.render('projects/projectsList', {
      //    "projectlist" : docs
  //      });
  //  });
  //});
};

exports.postProject = function(req, res) {

  return res.redirect('/');
}