const Teacher = require('../models/Teacher');
const asyncHandler = require('express-async-handler');

// Get all teachers with pagination, sorting, filtering
const getTeachers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, sortBy = 'name', order = 'asc', search } = req.query;

  const query = search ? { name: { $regex: search, $options: 'i' } } : {};

  const teachers = await Teacher.find(query)
    .populate('assignedClass')
    .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const totalTeachers = await Teacher.countDocuments(query);

  res.json({ teachers, totalPages: Math.ceil(totalTeachers / limit), currentPage: parseInt(page), total: totalTeachers });
});


// Get teacher by ID
const getTeacherById = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id).populate('assignedClass');
  if (!teacher) {
    res.status(404);
    throw new Error('Teacher not found');
  }
  res.json(teacher);
});

// Create a new teacher
const createTeacher = asyncHandler(async (req, res) => {
  const teacher = new Teacher(req.body);
  await teacher.save();
  res.status(201).json(teacher);
});

// Update teacher details
const updateTeacher = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  if (!teacher) {
    res.status(404);
    throw new Error('Teacher not found');
  }
  Object.assign(teacher, req.body);
  await teacher.save();
  res.json(teacher);
});

// Delete a teacher
const deleteTeacher = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  if (!teacher) {
    res.status(404);
    throw new Error('Teacher not found');
  }
  await Teacher.deleteOne({ _id: req.params.id });
  res.json({ message: 'Teacher removed' });
});

const getSalaryAnalytics = asyncHandler(async (req, res) => {
  const salaryAnalytics = await Teacher.aggregate([
    {
      $group: {
        _id: null,  
        totalSalary: { $sum: '$salary' }
      }
    }
  ]);
  res.json(salaryAnalytics[0] || { totalSalary: 0 });
});


module.exports = {
  getTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getSalaryAnalytics,
};


