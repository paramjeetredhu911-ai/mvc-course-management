const express = require('express');
const router = express.Router();
const { enrollStudent, getStudentEnrollments, getCourseStudents, removeEnrollment } = require('../controllers/enrollmentController');
const { protect } = require('../middleware/authMiddleware');

// All enrollment operations require user to be logged in with token
router.post('/enroll', protect, enrollStudent);
router.get('/my-enrollments', protect, getStudentEnrollments);
router.get('/course/:courseId', protect, getCourseStudents);
router.delete('/:id', protect, removeEnrollment);

module.exports = router;
