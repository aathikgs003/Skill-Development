import BatchSession from '../models/batch/BatchSession.model.js';
import Batch from '../models/batch/Batch.js';
import Notification from '../models/notification/Notification.model.js';
import Trainer from '../models/trainer/Trainer.js';
import logger from '../config/logger.js';

export const sendSessionReminders = async () => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Find all scheduled sessions for today
    const sessions = await BatchSession.find({
      status: 'Scheduled',
      startTime: { $gte: startOfDay, $lte: endOfDay },
    }).populate('batch');

    let remindersSent = 0;

    for (const session of sessions) {
      if (!session.batch) continue;

      // 1. Notify Trainer
      // The session.trainer is ref: Trainer. Let's resolve the User associated with the Trainer
      const trainerDoc = await Trainer.findById(session.trainer).populate('user');
      if (trainerDoc && trainerDoc.user) {
        await Notification.create({
          user: trainerDoc.user._id,
          title: 'Session Reminder (Today)',
          body: `Reminder: You have a scheduled "${session.title}" session today from ${new Date(session.startTime).toLocaleTimeString()} to ${new Date(session.endTime).toLocaleTimeString()}.`,
          channel: 'In-App',
          deliveryStatus: 'Sent',
        });
        remindersSent++;
      }

      // 2. Notify Enrolled Students
      // The Batch model stores students as array of ref User
      const batchDoc = await Batch.findById(session.batch._id);
      if (batchDoc && batchDoc.students && batchDoc.students.length > 0) {
        const studentNotifications = batchDoc.students.map((studentUserId) => ({
          user: studentUserId,
          title: 'Upcoming Session Today',
          body: `Reminder: Your class "${session.title}" is scheduled today from ${new Date(session.startTime).toLocaleTimeString()} to ${new Date(session.endTime).toLocaleTimeString()}.`,
          channel: 'In-App',
          deliveryStatus: 'Sent',
        }));

        await Notification.insertMany(studentNotifications);
        remindersSent += studentNotifications.length;
      }
    }

    if (remindersSent > 0) {
      logger.info(`✅ Sent ${remindersSent} session reminders for today`);
    }
  } catch (error) {
    logger.error(`❌ Error sending session reminders: ${error.message}`);
  }
};
