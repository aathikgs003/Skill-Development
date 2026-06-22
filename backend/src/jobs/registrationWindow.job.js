import RegistrationWindow from '../models/scheduling/RegistrationWindow.model.js';
import Notification from '../models/notification/Notification.model.js';
import User from '../models/auth/User.js';
import logger from '../config/logger.js';

// Helper to notify all students
const notifyAllStudents = async (title, body) => {
  try {
    const students = await User.find({ role: 'Student', status: 'Active' });
    const notifications = students.map(student => ({
      user: student._id,
      title,
      body,
      channel: 'In-App',
      deliveryStatus: 'Sent'
    }));
    if (notifications.length > 0) {
      await Notification.insertMany(notifications);
      logger.info(`Notification sent to ${notifications.length} students: ${title}`);
    }
  } catch (error) {
    logger.error(`Error sending notification to students: ${error.message}`);
  }
};

// Open windows whose startAt has arrived
export const openRegistrationWindows = async () => {
  try {
    const now = new Date();
    // Find windows that are Upcoming but startAt is reached
    const windowsToOpen = await RegistrationWindow.find({
      status: 'Upcoming',
      registrationStartAt: { $lte: now }
    });

    if (windowsToOpen.length > 0) {
      for (const window of windowsToOpen) {
        window.status = 'Open';
        await window.save();
        
        // Notify students that a registration window is open
        await notifyAllStudents(
          'Registration Window Open!',
          `Registration window "${window.windowName}" is now open. Go register before it closes on ${new Date(window.registrationEndAt).toLocaleString()}!`
        );
      }
      logger.info(`✅ Opened ${windowsToOpen.length} registration windows`);
    }
  } catch (error) {
    logger.error(`❌ Error opening windows: ${error.message}`);
  }
};

// Close windows whose endAt has passed
export const closeRegistrationWindows = async () => {
  try {
    const now = new Date();
    // Find windows that are Open but endAt is reached
    const windowsToClose = await RegistrationWindow.find({
      status: 'Open',
      registrationEndAt: { $lte: now }
    });

    if (windowsToClose.length > 0) {
      for (const window of windowsToClose) {
        window.status = 'Closed';
        await window.save();
      }
      logger.info(`✅ Closed ${windowsToClose.length} registration windows`);
    }
  } catch (error) {
    logger.error(`❌ Error closing windows: ${error.message}`);
  }
};

// Send reminders X days before registration ends
export const sendRegistrationReminders = async () => {
  try {
    const now = new Date();
    const windows = await RegistrationWindow.find({
      status: 'Open',
      notificationEnabled: true,
    });

    for (const window of windows) {
      let updated = false;
      for (const reminder of window.reminderSchedule || []) {
        if (reminder.sent) continue;

        const reminderDate = new Date(window.registrationEndAt);
        reminderDate.setDate(reminderDate.getDate() - reminder.daysBefore);

        if (now >= reminderDate) {
          await notifyAllStudents(
            'Registration Closing Soon',
            `Registration for window "${window.windowName}" is closing in ${reminder.daysBefore} day(s). Make sure to enroll now!`
          );
          reminder.sent = true;
          reminder.sentAt = now;
          updated = true;
        }
      }
      if (updated) {
        await window.save();
      }
    }
  } catch (error) {
    logger.error(`❌ Error sending registration window reminders: ${error.message}`);
  }
};
