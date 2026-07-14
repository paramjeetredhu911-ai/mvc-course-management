const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: ['Active', 'Inactive'],
      default: 'Active'
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model('Category', CategorySchema);
