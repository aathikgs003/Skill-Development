import Country from './master/Country.model.js';
import State from './master/State.model.js';
import District from './master/District.model.js';
import City from './master/City.model.js';
import SkillCategory from './master/SkillCategory.model.js';
import Skill from './master/Skill.model.js';
import Language from './master/Language.model.js';
import EducationType from './master/EducationType.model.js';
import CourseCategory from './master/CourseCategory.model.js';
import DocumentType from './master/DocumentType.model.js';
import Board from './master/Board.model.js';
import University from './master/University.model.js';
import Degree from './master/Degree.model.js';
import Department from './master/Department.model.js';
import SalaryRange from './master/SalaryRange.model.js';
import ExpenseCategory from './master/ExpenseCategory.model.js';
import Role from './auth/Role.model.js';
import Permission from './auth/Permission.model.js';
import UserRole from './auth/UserRole.model.js';
import RolePermission from './auth/RolePermission.model.js';
import UserPermission from './auth/UserPermission.model.js';
import LoginHistory from './auth/LoginHistory.model.js';
import AuditLog from './auth/AuditLog.model.js';
import StudentSchoolDetail from './student/StudentSchoolDetail.model.js';
import StudentCollegeDetail from './student/StudentCollegeDetail.model.js';
import StudentEmploymentDetail from './student/StudentEmploymentDetail.model.js';
import StudentUnemployedDetail from './student/StudentUnemployedDetail.model.js';
import StudentSkill from './student/StudentSkill.model.js';
import StudentInterestedSkill from './student/StudentInterestedSkill.model.js';
import StudentCodingProfile from './student/StudentCodingProfile.model.js';
import StudentLanguage from './student/StudentLanguage.model.js';
import StudentCertification from './student/StudentCertification.model.js';
import StudentAchievement from './student/StudentAchievement.model.js';
import StudentDocument from './student/StudentDocument.model.js';
import TrainerSkill from './trainer/TrainerSkill.model.js';
import TrainerCertification from './trainer/TrainerCertification.model.js';
import TrainerAvailability from './trainer/TrainerAvailability.model.js';
import TrainerAvailabilityException from './trainer/TrainerAvailabilityException.model.js';
import TrainerExperience from './trainer/TrainerExperience.model.js';
import TrainerDocument from './trainer/TrainerDocument.model.js';
import TeachingMaterial from './trainer/TeachingMaterial.model.js';
import Coordinator from './coordinator/Coordinator.model.js';
import CoordinatorSkill from './coordinator/CoordinatorSkill.model.js';
import CoordinatorLanguage from './coordinator/CoordinatorLanguage.model.js';
import CoordinatorAssignment from './coordinator/CoordinatorAssignment.model.js';
import Organization from './organization/Organization.model.js';
import OrganizationDomain from './organization/OrganizationDomain.model.js';
import OrganizationSkill from './organization/OrganizationSkill.model.js';
import OrganizationSpecialization from './organization/OrganizationSpecialization.model.js';
import OrganizationDocument from './organization/OrganizationDocument.model.js';
import OrganizationStaff from './organization/OrganizationStaff.model.js';
import ImplementationPartner from './partner/ImplementationPartner.model.js';
import OrganizationRecommendation from './partner/OrganizationRecommendation.model.js';
import TrainerRecommendation from './partner/TrainerRecommendation.model.js';
import StudentRecommendation from './partner/StudentRecommendation.model.js';
import FundingAgency from './funding/FundingAgency.model.js';
import FundingProgram from './funding/FundingProgram.model.js';
import FundingAllocation from './funding/FundingAllocation.model.js';
import FundRelease from './funding/FundRelease.model.js';
import FundUtilization from './funding/FundUtilization.model.js';
import TrainerPool from './pool/TrainerPool.model.js';
import TrainerPoolSkill from './pool/TrainerPoolSkill.model.js';
import TrainerPoolCertification from './pool/TrainerPoolCertification.model.js';
import CoordinatorPool from './pool/CoordinatorPool.model.js';
import CoordinatorPoolLanguage from './pool/CoordinatorPoolLanguage.model.js';
import StudentPool from './pool/StudentPool.model.js';
import StudentPoolSkill from './pool/StudentPoolSkill.model.js';
import CoursePrerequisiteSkill from './course/CoursePrerequisiteSkill.model.js';
import CourseSkillCovered from './course/CourseSkillCovered.model.js';
import CourseModule from './course/CourseModule.model.js';
import CourseTopic from './course/CourseTopic.model.js';
import BatchTrainer from './batch/BatchTrainer.model.js';
import BatchCoordinator from './batch/BatchCoordinator.model.js';
import BatchSession from './batch/BatchSession.model.js';
import Enrollment from './enrollment/Enrollment.model.js';
import EnrollmentStatusHistory from './enrollment/EnrollmentStatusHistory.model.js';
import StudentAttendance from './attendance/StudentAttendance.model.js';
import TrainerAttendance from './attendance/TrainerAttendance.model.js';
import QRAttendanceCode from './attendance/QRAttendanceCode.model.js';
import AttendanceAnalytics from './attendance/AttendanceAnalytics.model.js';
import Assessment from './assessment/Assessment.model.js';
import AssessmentQuestion from './assessment/AssessmentQuestion.model.js';
import AssessmentSubmission from './assessment/AssessmentSubmission.model.js';
import AssessmentAnswerDetail from './assessment/AssessmentAnswerDetail.model.js';
import StudentEvaluation from './assessment/StudentEvaluation.model.js';
import Certificate from './certificate/Certificate.model.js';
import CertificateTemplate from './certificate/CertificateTemplate.model.js';
import CertificateVerificationLog from './certificate/CertificateVerificationLog.model.js';
import Feedback from './feedback/Feedback.model.js';
import FeedbackQuestion from './feedback/FeedbackQuestion.model.js';
import FeedbackAnswer from './feedback/FeedbackAnswer.model.js';
import SupportTicket from './ticket/SupportTicket.model.js';
import TicketComment from './ticket/TicketComment.model.js';
import TicketStatusHistory from './ticket/TicketStatusHistory.model.js';
import NotificationTemplate from './notification/NotificationTemplate.model.js';
import Notification from './notification/Notification.model.js';
import NotificationPreference from './notification/NotificationPreference.model.js';
import OrganizationRanking from './analytics/OrganizationRanking.model.js';
import TrainerRanking from './analytics/TrainerRanking.model.js';
import StudentSkillGrowth from './analytics/StudentSkillGrowth.model.js';
import CoursePerformance from './analytics/CoursePerformance.model.js';
import FundingUtilizationAnalytics from './analytics/FundingUtilizationAnalytics.model.js';
import Placement from './analytics/Placement.model.js';
import RegistrationWindow from './scheduling/RegistrationWindow.model.js';
import TrainerTimeSlot from './scheduling/TrainerTimeSlot.model.js';
import ModuleSchedule from './scheduling/ModuleSchedule.model.js';
import ScheduleConflict from './scheduling/ScheduleConflict.model.js';
import AllocationRule from './scheduling/AllocationRule.model.js';
import Message from './communication/Message.model.js';
import Announcement from './communication/Announcement.model.js';
import DailyReport from './report/DailyReport.model.js';
import SystemSetting from './system/SystemSetting.model.js';
import EmailTemplate from './system/EmailTemplate.model.js';
import FileUpload from './system/FileUpload.model.js';

export {
  Country,
  State,
  District,
  City,
  SkillCategory,
  Skill,
  Language,
  EducationType,
  CourseCategory,
  DocumentType,
  Board,
  University,
  Degree,
  Department,
  SalaryRange,
  ExpenseCategory,
  Role,
  Permission,
  UserRole,
  RolePermission,
  UserPermission,
  LoginHistory,
  AuditLog,
  StudentSchoolDetail,
  StudentCollegeDetail,
  StudentEmploymentDetail,
  StudentUnemployedDetail,
  StudentSkill,
  StudentInterestedSkill,
  StudentCodingProfile,
  StudentLanguage,
  StudentCertification,
  StudentAchievement,
  StudentDocument,
  TrainerSkill,
  TrainerCertification,
  TrainerAvailability,
  TrainerAvailabilityException,
  TrainerExperience,
  TrainerDocument,
  TeachingMaterial,
  Coordinator,
  CoordinatorSkill,
  CoordinatorLanguage,
  CoordinatorAssignment,
  Organization,
  OrganizationDomain,
  OrganizationSkill,
  OrganizationSpecialization,
  OrganizationDocument,
  OrganizationStaff,
  ImplementationPartner,
  OrganizationRecommendation,
  TrainerRecommendation,
  StudentRecommendation,
  FundingAgency,
  FundingProgram,
  FundingAllocation,
  FundRelease,
  FundUtilization,
  TrainerPool,
  TrainerPoolSkill,
  TrainerPoolCertification,
  CoordinatorPool,
  CoordinatorPoolLanguage,
  StudentPool,
  StudentPoolSkill,
  CoursePrerequisiteSkill,
  CourseSkillCovered,
  CourseModule,
  CourseTopic,
  BatchTrainer,
  BatchCoordinator,
  BatchSession,
  Enrollment,
  EnrollmentStatusHistory,
  StudentAttendance,
  TrainerAttendance,
  QRAttendanceCode,
  AttendanceAnalytics,
  Assessment,
  AssessmentQuestion,
  AssessmentSubmission,
  AssessmentAnswerDetail,
  StudentEvaluation,
  Certificate,
  CertificateTemplate,
  CertificateVerificationLog,
  Feedback,
  FeedbackQuestion,
  FeedbackAnswer,
  SupportTicket,
  TicketComment,
  TicketStatusHistory,
  NotificationTemplate,
  Notification,
  NotificationPreference,
  OrganizationRanking,
  TrainerRanking,
  StudentSkillGrowth,
  CoursePerformance,
  FundingUtilizationAnalytics,
  Placement,
  RegistrationWindow,
  TrainerTimeSlot,
  ModuleSchedule,
  ScheduleConflict,
  AllocationRule,
  Message,
  Announcement,
  DailyReport,
  SystemSetting,
  EmailTemplate,
  FileUpload
};
