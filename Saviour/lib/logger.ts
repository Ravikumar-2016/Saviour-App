/**
 * Logger Utility - Handles all logging throughout the application
 * In production builds, logs are suppressed automatically
 */

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export const logger = {
  /**
   * Debug level - Only shown in development
   */
  debug: (message: string, data?: any) => {
    if (!IS_PRODUCTION) {
      console.debug(`[DEBUG] ${message}`, data);
    }
  },

  /**
   * Info level - Important information
   */
  info: (message: string, data?: any) => {
    if (!IS_PRODUCTION) {
      console.log(`[INFO] ${message}`, data);
    }
  },

  /**
   * Warning level - Potential issues
   */
  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${message}`, data);
  },

  /**
   * Error level - Always logged
   */
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error);
  },
};

export default logger;
