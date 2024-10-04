const express = require('express');
const classController = require('../controllers/classController');

const router = express.Router();

router.route('/analytics')
  .get(classController.getClassAnalytics);


router.route('/')
  .get( classController.getClasses)
  .post( classController.createClass);

router.route('/:id')
  .get( classController.getClassById)
  .put( classController.updateClass)
  .delete( classController.deleteClass);



module.exports = router;


