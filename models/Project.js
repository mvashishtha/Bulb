var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({        
        //  email: { type: String, unique: true, lowercase: true},

  user_leader: {type: ObjectId, default: []},
  user_mem_list: {type: Array, default: []},//array of ObjectIds
  user_star_list: {type : Array, default: []},
  tags: {type : String, default: ''),
  date_started: {type: String, default: (new Date())},
  term: {type: String, default: ''},
  make_public: {type: Boolean, default: false}
    });


module.exports = mongoose.model('Project', projectSchema);
