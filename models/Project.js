var mongoose = require('mongoose');


var projectSchema = new mongoose.Schema({        
        //  email: { type: String, unique: true, lowercase: true},

  user_leader: {type: mongoose.Schema.Types.ObjectId, default: []},
  user_project_description: {type: String, default: ''},

  user_mem_list: {type: Array, default: []},//array of ObjectIds
  user_star_list: {type : Array, default: []},
  tags: {type : String, default: ''},
  date_started: {type: String, default: (new Date())},
  term: {type: String, default: ''},
  make_public: {type: Boolean, default: false},
  title: {type: String, default: '', unique: true}
    });


module.exports = mongoose.model('Project', projectSchema);
