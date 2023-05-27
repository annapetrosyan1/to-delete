/**
 * @typedef  AcceptTaskNotificationParams
 * 
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
    let result = '';
    if (notification.new_status === 'ready') 
        result = 'принято'
    else result = 'на доработке';
    return `Задание ${notification.task_id} проверено.\nСтатус задания: ${result} `;
}
/**
 * @param {AcceptTaskNotificationParams} notification
 * @returns
 */
export const handleNotificationEmail = (notification) => {
    let result = '';
    if (notification.new_status === 'ready') 
        result = 'принято'
    else result = 'на доработке';
    return `Задание ${notification.task_id} проверено.\nСтатус задания: ${result} `;
}