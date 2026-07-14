const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    // i). All required fields validation
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, // ii). Unique email validation
      trim: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be minimum 6 characters long'] // iii). Password minimum 6 characters
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: ['Student', 'Admin'], // Restricts input to precisely Student or Admin
      default: 'Student'
    },
    profileImage: {
      type: String,
      default: ''
    },
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true // Automatically adds and manages createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('User', UserSchema);
