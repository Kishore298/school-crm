const express = require('express');
const teacherController = require('../controllers/teacherController');

const router = express.Router();
  
router.route('/analytics')
.get(teacherController.getSalaryAnalytics);

router.route('/')
  .get( teacherController.getTeachers)
  .post(  teacherController.createTeacher);

router.route('/:id')
  .get(teacherController.getTeacherById)
  .put( teacherController.updateTeacher)
  .delete(teacherController.deleteTeacher);

  


module.exports = router;

