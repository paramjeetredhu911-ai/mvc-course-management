const Course = require('../models/CourseModel');

// 1. Add Course
exports.addCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({ success: true, data: course });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 2. Get All Courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('category createdBy', 'categoryName fullName email');
    res.status(200).json({ success: true, count: courses.length, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Get Single Course
exports.getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('category createdBy', 'categoryName fullName email');
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Update Course
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, data: course });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 5. Delete Course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
