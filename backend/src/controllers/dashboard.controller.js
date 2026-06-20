import User from '../models/auth/User.js';
import Student from '../models/student/Student.js';
import Trainer from '../models/trainer/Trainer.js';
import Batch from '../models/batch/Batch.js';
import Course from '../models/course/Course.js';
import Enrollment from '../models/enrollment/Enrollment.model.js';
import Announcement from '../models/communication/Announcement.model.js';
import Certificate from '../models/certificate/Certificate.model.js';
import ApiResponse from '../utils/apiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getDashboardStats = asyncHandler(async (req, res) => {
  const role = req.user.role;
  const userId = req.user._id;

  if (role === 'Student') {
    // 1. Fetch Student Profile
    const studentProfile = await Student.findOne({ user: userId });
    const studentId = studentProfile ? studentProfile._id : null;

    // 2. Fetch Enrollments
    const enrollments = studentId 
      ? await Enrollment.find({ student: studentId }).populate('course').populate({ path: 'batch', populate: { path: 'trainer' } }) 
      : [];

    // 3. Fetch Certifications count
    const certCount = studentId 
      ? await Certificate.countDocuments({ student: studentId }) 
      : 0;

    // 4. Fetch Announcements
    const announcements = await Announcement.find().sort({ createdAt: -1 }).limit(5);

    // Calculate stats
    const stats = {
      enrolledBatches: enrollments.filter(e => e.batch).length,
      ongoingCourses: enrollments.filter(e => e.enrollmentStatus === 'Enrolled').length,
      certifications: certCount,
      completedClasses: enrollments.filter(e => e.enrollmentStatus === 'Completed').length,
      enrollments,
      announcements
    };

    return res.status(200).json(new ApiResponse(200, stats, 'Student dashboard stats fetched successfully'));
  }

  if (role === 'SuperAdmin' || role === 'Admin') {
    // 1. Counts
    const totalStudents = await Student.countDocuments();
    const activeTrainers = await Trainer.countDocuments();
    const activeBatches = await Batch.countDocuments({ status: 'Ongoing' });
    const totalBatches = await Batch.countDocuments();
    const partnerAgencies = await User.countDocuments({ role: 'Partner' });

    // 2. Fetch latest batches
    const latestBatches = await Batch.find()
      .populate('course trainer')
      .sort({ createdAt: -1 })
      .limit(5);

    // 3. Mock enrollment trends for charts (dynamic mock but structured)
    const trends = [
      { name: 'Jan', enrollments: 40 },
      { name: 'Feb', enrollments: 65 },
      { name: 'Mar', enrollments: 120 },
      { name: 'Apr', enrollments: 85 },
      { name: 'May', enrollments: 170 },
      { name: 'Jun', enrollments: totalStudents > 0 ? totalStudents : 220 },
    ];

    const stats = {
      totalStudents,
      activeTrainers,
      activeBatches,
      totalBatches,
      partnerAgencies,
      latestBatches,
      trends
    };

    return res.status(200).json(new ApiResponse(200, stats, 'Admin dashboard stats fetched successfully'));
  }

  // Fallback for other roles
  return res.status(200).json(new ApiResponse(200, {}, 'Dashboard stats fetched successfully'));
});
