const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  point: {
    type: Number,
    default: 0
  }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
