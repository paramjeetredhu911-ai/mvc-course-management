const Enrollment = require('../models/EnrollmentModel');

// 1. Enroll Student
exports.enrollStudent = async (req, res) => {
  try {
    const { courseId } = req.body;
    const studentId = req.user.id; // Extracted directly from secure protect token

    const existingEnrollment = await Enrollment.findOne({ studentId, courseId });
    if (existingEnrollment) {
      return res.status(409).json({ success: false, message: 'You are already enrolled in this course.' });
    }

    const enrollment = await Enrollment.create({ studentId, courseId });
    res.status(201).json({ success: true, data: enrollment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// 2. Get Student Enrollments
exports.getStudentEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ studentId: req.user.id })
      .populate('studentId', 'fullName email') // Displays studentName and studentEmail
      .populate({
        path: 'courseId',
        select: 'title category',
        populate: { path: 'category', select: 'categoryName' } // Deep populate to extract Category Name
      });

    res.status(200).json({ success: true, count: enrollments.length, data: enrollments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Get Course Students
exports.getCourseStudents = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ courseId: req.params.courseId })
      .populate('studentId', 'fullName email')
      .populate({
        path: 'courseId',
        select: 'title category',
        populate: { path: 'category', select: 'categoryName' }
      });

    res.status(200).json({ success: true, count: enrollments.length, data: enrollments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Remove Enrollment
exports.removeEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ success: false, message: 'Enrollment record not found' });
    }
    res.status(200).json({ success: true, message: 'Enrollment removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
