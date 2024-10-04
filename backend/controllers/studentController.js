const Student = require('../models/Student');
const asyncHandler = require('express-async-handler');

// Get all students with pagination, sorting, filtering
const getStudents = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, sortBy = 'name', order = 'asc', search } = req.query;

  const query = search ? { name: { $regex: search, $options: 'i' } } : {};

  const students = await Student.find(query)
    .populate('assignedClass')
    .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const totalStudents = await Student.countDocuments(query);

  res.json({ students, totalPages: Math.ceil(totalStudents / limit), currentPage: parseInt(page), total: totalStudents });
});

// Get student by ID
const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id).populate('assignedClass');
  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }
  res.json(student);
});

// Create a new student
const createStudent = asyncHandler(async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.status(201).json(student);
});

// Update student details
const updateStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }
  Object.assign(student, req.body);
  await student.save();
  res.json(student);
});

// Delete a student
const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    res.status(404);
    throw new Error('Student not found');
  }
  await Student.deleteOne({ _id: req.params.id });
  res.json({ message: 'Student removed' });
});

// Get fees analytics
const getFeesAnalytics = asyncHandler(async (req, res) => {
  try {
    const feesAnalytics = await Student.aggregate([
      {
        $group: {
          _id: null,
          totalPaid: { $sum: "$feesPaid" },
          remainingFees: { $sum: { $subtract: ["$feesStructure.totalFees", "$feesPaid"] } }
        }
      }
    ]);
    const result = feesAnalytics[0] || { totalPaid: 0, remainingFees: 0 };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student analytics', error });
  }
});

const getGenderAnalytics = asyncHandler(async (req, res) => {
  try {
    const genderAnalytics = await Student.aggregate([
      {
        $group: {
          _id: "$gender",
          count: { $sum: 1 }
        }
      }
    ]);

    const result = {
      male: 0,
      female: 0,
    };

    genderAnalytics.forEach(entry => {
      if (entry._id === "male") {
        result.male = entry.count;
      } else if (entry._id === "female") {
        result.female = entry.count;
      }
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching gender analytics', error });
  }
});

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getFeesAnalytics,
  getGenderAnalytics, 
};


