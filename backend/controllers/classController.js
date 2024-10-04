const Class = require('../models/Class');
const asyncHandler = require('express-async-handler');

const getClasses = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, sortBy = 'className', order = 'asc', search } = req.query;

  const query = search ? { className: { $regex: search, $options: 'i' } } : {};

  const classes = await Class.find(query)
    .populate('teacher')
    .populate('students')
    .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const totalClasses = await Class.countDocuments(query);

  res.json({ classes, totalPages: Math.ceil(totalClasses / limit), currentPage: parseInt(page), total: totalClasses });
});


// Get class by ID
const getClassById = asyncHandler(async (req, res) => {
  const classData = await Class.findById(req.params.id)
    .populate('teacher')
    .populate('students');
  if (!classData) {
    res.status(404);
    throw new Error('Class not found');
  }
  res.json(classData);
});

// Create a new class
const createClass = asyncHandler(async (req, res) => {
  const classData = new Class(req.body);
  await classData.save();
  res.status(201).json(classData);
});

// Update class details
const updateClass = asyncHandler(async (req, res) => {
  const classData = await Class.findById(req.params.id);
  if (!classData) {
    res.status(404);
    throw new Error('Class not found');
  }
  Object.assign(classData, req.body);
  await classData.save();
  res.json(classData);
});

// Delete a class
const deleteClass = asyncHandler(async (req, res) => {
  const classData = await Class.findById(req.params.id);
  if (!classData) {
    res.status(404);
    throw new Error('Class not found');
  }
  await Class.deleteOne({ _id: req.params.id });
  res.json({ message: 'Class removed' });
});

// class analytics
const getClassAnalytics = async (req, res) => {
  try {
    const classAnalytics = await Class.aggregate([
      {
        $project: {
          totalStudents: { $size: "$students" }
        }
      },
      {
        $group: {
          _id: null,
          totalStudents: { $sum: "$totalStudents" }
        }
      },
    ]);
    const totalClasses = await Class.countDocuments();

    const result = classAnalytics[0] || { totalStudents: 0 };
    res.status(200).json({
      totalStudents: result.totalStudents,
      totalClasses: totalClasses 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching class analytics', error });
  }
};




module.exports = {
  getClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
  getClassAnalytics,
};
