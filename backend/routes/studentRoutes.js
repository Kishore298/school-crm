const express = require('express');
const studentController = require('../controllers/studentController');

const router = express.Router();

router.route('/analytics')
.get(studentController.getFeesAnalytics);
router.get('/gender-analytics', studentController.getGenderAnalytics);


router.route('/')
  .get( studentController.getStudents)
  .post( studentController.createStudent);


router.route('/:id')
  .get( studentController.getStudentById)
  .put( studentController.updateStudent)
  .delete(studentController.deleteStudent);

  

module.exports = router;


