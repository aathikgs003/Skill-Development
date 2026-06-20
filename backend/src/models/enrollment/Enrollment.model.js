import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
    partner: { type: mongoose.Schema.Types.ObjectId, ref: 'ImplementationPartner' },
    program: { type: mongoose.Schema.Types.ObjectId, ref: 'FundingProgram' },
    appliedAt: { type: Date, default: Date.now },
    enrollmentStatus: { 
      type: String, 
      enum: ['Applied', 'Shortlisted', 'Approved', 'Rejected', 'Waitlisted', 'Enrolled', 'Completed', 'Dropped', 'Expelled'], 
      default: 'Applied' 
    },
    attendancePercentage: { type: Number, default: 0 },
    assessmentScore: { type: Number, default: 0 },
    isCertificateEligible: { type: Boolean, default: false },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

// 1. Pre-save Hook: Track old status & check certificate eligibility
enrollmentSchema.pre('save', async function (next) {
  // Capture old status for history tracking
  if (this.isModified('enrollmentStatus')) {
    if (!this.isNew) {
      const oldDoc = await this.constructor.findById(this._id);
      this._oldStatus = oldDoc ? oldDoc.enrollmentStatus : null;
    } else {
      this._oldStatus = 'None';
    }
  }

  // Check certificate eligibility
  if (this.isModified('enrollmentStatus') || this.isModified('attendancePercentage') || this.isModified('assessmentScore')) {
    try {
      const Course = mongoose.model('Course');
      const courseObj = await Course.findById(this.course);
      
      const minAttendance = courseObj?.minAttendancePct || 80;
      const minAssessment = courseObj?.minAssessmentScore || 50;

      if (
        this.enrollmentStatus === 'Completed' &&
        this.attendancePercentage >= minAttendance &&
        this.assessmentScore >= minAssessment
      ) {
        this.isCertificateEligible = true;
      } else {
        this.isCertificateEligible = false;
      }
    } catch (error) {
      console.error('Error during certificate eligibility check hook:', error);
    }
  }

  next();
});

// 2. Post-save Hook: Log status changes & update batch student counts
enrollmentSchema.post('save', async function (doc) {
  // Log status history change
  if (doc._oldStatus && doc._oldStatus !== doc.enrollmentStatus) {
    try {
      const EnrollmentStatusHistory = mongoose.model('EnrollmentStatusHistory');
      await EnrollmentStatusHistory.create({
        enrollment: doc._id,
        oldStatus: doc._oldStatus,
        newStatus: doc.enrollmentStatus,
        changedBy: doc.updatedBy || doc.student,
        changedAt: new Date(),
        remarks: 'Status updated automatically via system trigger.'
      });
    } catch (error) {
      console.error('Error creating enrollment status history log:', error);
    }
  }

  // Update batch student count
  if (doc.batch) {
    try {
      const Batch = mongoose.model('Batch');
      const countEnrolled = await doc.constructor.countDocuments({
        batch: doc.batch,
        enrollmentStatus: 'Enrolled'
      });
      const countWaitlisted = await doc.constructor.countDocuments({
        batch: doc.batch,
        enrollmentStatus: 'Waitlisted'
      });

      await Batch.findByIdAndUpdate(doc.batch, {
        currentEnrollment: countEnrolled,
        waitingListCount: countWaitlisted
      });
    } catch (error) {
      console.error('Error updating batch enrollment counts:', error);
    }
  }
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
export default Enrollment;
