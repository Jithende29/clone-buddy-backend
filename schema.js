import mongoose from "mongoose";

const { Schema } = mongoose;

// Admin schema
const adminSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// User schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Student schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String, required: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  gender: { type: String, required: true },
  course: { type: String, required: true },
  year: { type: String, required: true },
  semester: { type: String, required: true }
}, {
  timestamps: true
});

// Remove any existing indexes
studentSchema.index({ rollNo: 1 }, { unique: false, sparse: true });

// Form schema
const formSchema = new mongoose.Schema({
  name: String,
  rollno: String,
  email: String,
  branch: String,
  year: String,
  cgpa: String,
  attendance: String,
  leetcode: String,
  codechef: String,
  leetcodeCount: Number,
  codechefRating: Number,
  codeforce: String,
  skills: [String],
  expertise: [String],
  certificates: [{ name: String, link: String }],
  projects: [{ name: String, link: String }],
  awards: [{ name: String, link: String }],
  papers: [{ name: String, link: String }]
});

// Create models
export const Admin = mongoose.model('admin', adminSchema);
export const User = mongoose.model('user', userSchema);
export const Student = mongoose.model('Student', studentSchema);
export const Form = mongoose.model('forms', formSchema);