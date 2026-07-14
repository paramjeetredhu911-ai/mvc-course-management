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

// 2. Get All Courses (Task #10 Requirement: Search, Filter, Sort, Paginate)
exports.getAllCourses = async (req, res) => {
  try {
    // Built-in query builder object
    let queryObj = {};

    // A. FILTERING BY TITLE, CATEGORY, LEVEL, STATUS
    if (req.query.title) {
      // Regex allows partial matching case-insensitively
      queryObj.title = { $regex: req.query.title, $options: 'i' };
    }
    if (req.query.category) {
      queryObj.category = req.query.category;
    }
    if (req.query.level) {
      queryObj.level = req.query.level;
    }
    if (req.query.status) {
      queryObj.status = req.query.status;
    }

    // Initialize query command
    let query = Course.find(queryObj);

    // B. SORTING BY PRICE OR LATEST
    if (req.query.sortBy === 'price') {
      query = query.sort('price'); // low to high
    } else if (req.query.sortBy === 'price_desc') {
      query = query.sort('-price'); // high to low
    } else {
      query = query.sort('-createdAt'); // Default sorting: Latest first
    }

    // C. PAGINATION SETUP
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const totalCourses = await Course.countDocuments(queryObj);
    const totalPages = Math.ceil(totalCourses / limit);

    query = query.skip(skip).limit(limit);

    // Execute query with database population links
    const courses = await query.populate('category createdBy', 'categoryName fullName email');

    // D. FORMATTED API RESPONSE
    res.status(200).json({
      success: true,
      totalPages,
      totalCourses,
      currentPage: page,
      pageSize: courses.length,
      data: courses
    });
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
