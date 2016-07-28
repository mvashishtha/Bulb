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


exports.getProjPostings = function(req, res) {
    Project.find(function(err, docs) {
            res.render('project/projPostings', { projects: docs});
        });    
};


function convert_users(usr_ids, callback) {
    var usr_names = [];
    for (var i = 0; i < usr_ids.length; ) {
        User.findById(usr_ids[i], function(err, puppy) {
                console.log(i);
                usr_names.push(puppy.profile.name);                
                console.log(puppy.profile.name);
                if (i == usr_ids.length) {
                    return callback(usr_names);
                }
            });        
    }    
}


exports.getDisplayProject = function(req, res) {
    var pid = req.params.pid;
    //    var query = Project.where({id: pid});

    Project.findById(pid, function (err, kitten) {
            if (err) return res.redirect('/');            
            if (req.user){          
                User.find().populate
                res.render('project/projPage.jade', { in_project: kitten, uid: req.user.id});                                   
            }
            else res.redirect(req.session.returnTo || '/projpostings');
        });
};

/*exports.pushDisplayProject = function(req, res) {
    res.render('project/projPage.jade', {in_names : req.usr_names, in_project: kitten, uid: req.user.id});                                   
    }*/

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

exports.getJoinProject = function(req, res) {
    /*    if (req.user) return res.redirect('/');
    res.render('account/signup', {
            title: 'Create Account'
            });*/
    var pid = req.params.pid;
    var uid = req.params.uid;
    Project.findById(pid, function(err, kitten){
            if (err) return res.redirect('/');
            if (! contains(kitten.user_mem_list, uid)) {
                kitten.user_mem_list.push(uid);
                kitten.save();
            }
        });
    res.redirect(req.session.returnTo || '/projpostings');
};
    //    console.log('getjoinproject');
    //    var pid = req.params.pid;
    //    var uid = req.params.uid;
    /*    Project.findById(pid, function(err, kitten) {
            if (err) return res.redirect('/');
            if (! contains(kitten.user_mem_list, uid)) {
                console.log((kitten.user_mem_list + [uid]).toString());
                //                kitten.update({user_mem_list: kitten.user_mem_list + [uid]});
            }
            });  */  
