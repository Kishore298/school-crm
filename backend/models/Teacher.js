const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: { type: String },
  gender: { type: String},
  dob: { type: Date},
  contact: { type: String },
  email: { type: String, unique: true, match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'] },
  salary: { type: Number },
  assignedClass: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
});

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;

