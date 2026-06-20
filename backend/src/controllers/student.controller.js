import Student from '../models/student/Student.js';
import User from '../models/auth/User.js';
import ApiResponse from '../utils/apiResponse.js';
import ApiError from '../utils/apiError.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getAllStudents = asyncHandler(async (req, res) => {
  const students = await Student.find().populate('user', '-passwordHash');
  res.status(200).json(new ApiResponse(200, students, 'Students fetched successfully'));
});

export const getStudentById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id).populate('user', '-passwordHash');
  
  if (!student) {
    throw new ApiError(404, 'Student profile not found');
  }
  
  res.status(200).json(new ApiResponse(200, student, 'Student details fetched successfully'));
});

export const updateStudentProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { educationLevel, skills, guardianName, guardianMobile, schoolDetail, collegeDetail } = req.body;

  const student = await Student.findById(id);
  if (!student) {
    throw new ApiError(404, 'Student profile not found');
  }

  // Ensure user is authorized to edit this student profile (either the student themselves or an Admin)
  if (req.user.role !== 'Admin' && req.user.role !== 'SuperAdmin' && student.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'Unauthorized to update this profile');
  }

  if (educationLevel) student.educationLevel = educationLevel;
  if (skills) student.skills = skills;
  if (guardianName) student.guardianName = guardianName;
  if (guardianMobile) student.guardianMobile = guardianMobile;
  if (schoolDetail) student.schoolDetail = schoolDetail;
  if (collegeDetail) student.collegeDetail = collegeDetail;

  await student.save();

  const populatedStudent = await Student.findById(id).populate('user', '-passwordHash');

  res.status(200).json(new ApiResponse(200, populatedStudent, 'Student profile updated successfully'));
});
