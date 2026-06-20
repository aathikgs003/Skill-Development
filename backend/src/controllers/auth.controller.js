import User from '../models/auth/User.js';
import Student from '../models/student/Student.js';
import Trainer from '../models/trainer/Trainer.js';
import ApiResponse from '../utils/apiResponse.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt.js';

export const register = asyncHandler(async (req, res) => {
  const { firstName, middleName, lastName, email, mobile, password, role, gender, dateOfBirth, studentDetails, trainerDetails } = req.body;

  // 1. Check if user already exists
  const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
  if (existingUser) {
    throw new ApiError(400, 'User with this email or mobile already exists');
  }

  // 2. Create User
  const user = await User.create({
    firstName,
    middleName,
    lastName,
    email,
    mobile,
    passwordHash: password,
    role: role || 'Student',
    gender,
    dateOfBirth,
  });

  // 3. Create profile depending on role
  if (user.role === 'Student') {
    await Student.create({
      user: user._id,
      educationLevel: studentDetails?.educationLevel || 'Graduate',
      skills: studentDetails?.skills || [],
      guardianName: studentDetails?.guardianName || 'Guardian Name',
      guardianMobile: studentDetails?.guardianMobile || mobile,
    });
  } else if (user.role === 'Trainer') {
    await Trainer.create({
      user: user._id,
      experienceYears: trainerDetails?.experienceYears || 0,
      bio: trainerDetails?.bio || 'Professional trainer',
      specializations: trainerDetails?.specializations || [],
    });
  }

  // Hide passwordHash in output
  const userObj = user.toObject();
  delete userObj.passwordHash;

  res.status(201).json(new ApiResponse(201, { user: userObj }, 'User registered successfully'));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

  // Find user and select passwordHash explicitly
  const user = await User.findOne({ email }).select('+passwordHash');
  if (!user) {
    throw new ApiError(401, 'Invalid credentials');
  }

  // Verify password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid credentials');
  }

  // Generate tokens
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  // Save refresh token to database
  user.refreshToken = refreshToken;
  user.lastLoginAt = new Date();
  user.lastLoginIp = req.ip;
  await user.save();

  // Hide passwordHash in output
  const userObj = user.toObject();
  delete userObj.passwordHash;

  res
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: userObj, accessToken },
        'Login successful'
      )
    );
});

export const logout = asyncHandler(async (req, res) => {
  if (req.user) {
    await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } });
  }

  res
    .clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
    .status(200)
    .json(new ApiResponse(200, null, 'Logout successful'));
});

export const getMe = asyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, 'User not authenticated');
  }

  // If student or trainer, populate their profiles too
  let profile = null;
  if (req.user.role === 'Student') {
    profile = await Student.findOne({ user: req.user._id });
  } else if (req.user.role === 'Trainer') {
    profile = await Trainer.findOne({ user: req.user._id });
  }

  res.status(200).json(new ApiResponse(200, { user: req.user, profile }, 'Profile fetched successfully'));
});

export const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken || req.body?.refreshToken;

  if (!token) {
    throw new ApiError(401, 'Refresh token missing');
  }

  try {
    const decoded = verifyRefreshToken(token);
    const user = await User.findById(decoded.userId);

    if (!user || user.refreshToken !== token) {
      throw new ApiError(401, 'Invalid refresh token');
    }

    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    user.refreshToken = newRefreshToken;
    await user.save();

    res
      .cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json(
        new ApiResponse(
          200,
          { accessToken: newAccessToken },
          'Token refreshed successfully'
        )
      );
  } catch (error) {
    throw new ApiError(401, 'Invalid or expired refresh token');
  }
});
