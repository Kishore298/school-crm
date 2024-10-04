const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  assignedClass: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  feesStructure: {
    totalFees: { type: Number },
    dueDate: { type: Date }
  },
  feesPaid: { type: Number},
  remainingFees: { type: Number },
  contact: { type: String },
  dob: { type: Date },
  gender: { type: String }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
