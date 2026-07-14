const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Course description is required'],
      trim: true
    },
    thumbnail: {
      type: String,
      default: ''
    },
    instructor: {
      type: String,
      required: [true, 'Instructor name is required'],
      trim: true
    },
    price: {
      type: Number,
      required: [true, 'Course price is required'],
      min: [0, 'Price cannot be negative']
    },
    duration: {
      type: String,
      required: [true, 'Course duration is required'],
      trim: true
    },
    level: {
      type: String,
      required: [true, 'Course level is required'],
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner'
    },
    language: {
      type: String,
      required: [true, 'Course language is required'],
      trim: true,
      default: 'English'
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category', // Reference to Category schema model
      required: [true, 'Course category assignment is required']
    },
    status: {
      type: String,
      required: [true, 'Course status is required'],
      enum: ['Draft', 'Published', 'Archived'],
      default: 'Draft'
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to User schema model
      required: [true, 'Creator reference identity link is required']
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model('Course', CourseSchema);
