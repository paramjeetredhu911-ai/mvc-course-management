const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to User model
      required: [true, 'Student reference identifier link is required']
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course', // Reference to Course model
      required: [true, 'Course reference identifier link is required']
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    },
    progress: {
      type: Number,
      default: 0,
      min: [0, 'Progress percentage cannot be below 0'],
      max: [100, 'Progress percentage cannot exceed 100']
    },
    completed: {
      type: Boolean,
      default: false
    },
    certificateIssued: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt automatically
  }
);

// Remark Requirement: Unique index on studentId + courseId combination prevents duplicate enrollments
EnrollmentSchema.index({ studentId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', EnrollmentSchema);
