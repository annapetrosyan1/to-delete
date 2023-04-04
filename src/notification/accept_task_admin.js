/**
 * @typedef  AcceptTaskNotificationParams
 * 
 * @prop {string} task_id
 * @prop {string} user_id
 * @prop {string} new_status
 */

/**
 * @param {AcceptTaskNotificationParams} notification
 * @returns
 */
export const handleNotificationTelegram = (notification) => {
    return `Update for task ${notification.task_id} user ${notification.task_id}: ${notification.new_status} to telegram.`;
}
/**
 * @param {AcceptTaskNotificationParams} notification
 * @returns
 */
export const handleNotificationEmail = (notification) => {
    return `Update for task ${notification.task_id} user ${notification.task_id}: ${notification.new_status} to email.`;
}