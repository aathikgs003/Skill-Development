import cron from 'node-cron';
import logger from '../config/logger.js';
import { openRegistrationWindows, closeRegistrationWindows, sendRegistrationReminders } from './registrationWindow.job.js';
import { detectScheduleConflicts } from './conflictDetection.job.js';
import { sendSessionReminders } from './sessionReminder.job.js';

export const initScheduler = () => {
  // Every 5 minutes — open windows whose startAt is reached
  cron.schedule('*/5 * * * *', async () => {
    logger.info('🔄 Running Cron: Open registration windows');
    await openRegistrationWindows();
  });

  // Every 5 minutes — close windows whose endAt has passed
  cron.schedule('*/5 * * * *', async () => {
    logger.info('🔄 Running Cron: Close registration windows');
    await closeRegistrationWindows();
  });

  // Daily 8 AM — send reminders for upcoming registration windows
  cron.schedule('0 8 * * *', async () => {
    logger.info('🔄 Running Cron: Send registration window reminders');
    await sendRegistrationReminders();
  });

  // Every hour — detect schedule conflicts
  cron.schedule('0 * * * *', async () => {
    logger.info('🔄 Running Cron: Detect schedule conflicts');
    await detectScheduleConflicts();
  });

  // Daily 9 AM — send session reminders
  cron.schedule('0 9 * * *', async () => {
    logger.info('🔄 Running Cron: Send session reminders');
    await sendSessionReminders();
  });

  logger.info('✅ Scheduler (Background Cron Jobs) initialized successfully');
};
