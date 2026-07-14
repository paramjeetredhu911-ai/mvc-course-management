const express = require('express');
const router = express.Router();
const { addCourse, getAllCourses, getSingleCourse, updateCourse, deleteCourse } = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleware');

// Public route to look up courses
router.get('/', getAllCourses);
router.get('/:id', getSingleCourse);

// Protected routes requiring user login authentication token
router.post('/', protect, addCourse);
router.put('/:id', protect, updateCourse);
router.delete('/:id', protect, deleteCourse);

module.exports = router;
