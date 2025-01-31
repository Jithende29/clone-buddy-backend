import express from 'express';
import cors from 'cors';
import connect from './connection.js';
import { User, Student } from './schema.js';
import bcrypt from 'bcrypt';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

// Connect to MongoDB
connect();

// Input validation middleware
const validateRegistration = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ 
      error: 'All fields are required' 
    });
  }

  if (name.length < 2) {
    return res.status(400).json({ 
      error: 'Name must be at least 2 characters long' 
    });
  }

  if (password.length < 6) {
    return res.status(400).json({ 
      error: 'Password must be at least 6 characters long' 
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      error: 'Please enter a valid email address' 
    });
  }

  next();
};

// User Registration
app.post('/userreg', validateRegistration, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        error: 'An account with this email already exists' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();
    
    res.status(201).json({ 
      message: 'Registration successful! Please sign in.',
      success: true
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      error: 'Registration failed. Please try again later.' 
    });
  }
});

// User Login
app.post('/userlogin', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password are required' 
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        error: 'Invalid email or password' 
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        error: 'Invalid email or password' 
      });
    }

    res.json({ 
      message: 'Login successful',
      success: true,
      user: {
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'Login failed. Please try again later.' 
    });
  }
});

// Submit or Update Student Details
app.post('/student/submit', async (req, res) => {
  try {
    const studentData = req.body;
    
    // Validate required fields
    const requiredFields = [
      'name', 'age', 'dob', 'email', 'phoneNumber',
      'address', 'gender', 'course', 'year', 'semester'
    ];
    
    const missingFields = requiredFields.filter(field => !studentData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Convert date string to Date object
    if (studentData.dob) {
      studentData.dob = new Date(studentData.dob);
    }

    // Try to find existing student record
    const existingStudent = await Student.findOne({ email: studentData.email });

    if (existingStudent) {
      // Update existing student
      const updatedStudent = await Student.findOneAndUpdate(
        { email: studentData.email },
        { $set: studentData },
        { 
          new: true, 
          runValidators: true,
          upsert: false // Don't create if doesn't exist
        }
      );

      if (!updatedStudent) {
        return res.status(404).json({
          error: 'Student not found'
        });
      }

      return res.json({ 
        message: 'Student details updated successfully',
        student: updatedStudent
      });
    } else {
      // Check if a user exists with this email
      const existingUser = await User.findOne({ email: studentData.email });
      if (!existingUser) {
        return res.status(400).json({
          error: 'No user account found with this email. Please register first.'
        });
      }

      // Create new student record
      const newStudent = new Student(studentData);
      await newStudent.save();
      return res.json({ 
        message: 'Student details saved successfully',
        student: newStudent
      });
    }
  } catch (error) {
    console.error('Error saving student details:', error);
    if (error.code === 11000) {
      return res.status(400).json({
        error: 'A student with this email already exists'
      });
    } else if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        error: 'Validation failed: ' + validationErrors.join(', ')
      });
    } else {
      return res.status(500).json({
        error: 'Error saving student details. Please try again.'
      });
    }
  }
});

// Get Student Details
app.get('/student/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const student = await Student.findOne({ email });
    
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Development only - Reset users (DO NOT USE IN PRODUCTION)
app.post('/dev/reset-users', async (req, res) => {
  try {
    await User.deleteMany({});
    res.json({ message: 'All users have been reset' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reset users' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});