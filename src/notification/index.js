/**
 * @typedef  NotificationInterface
 * 
 * @prop {string} id
 * @prop {string} notification_type
 * @prop {any} params
 * @prop {number} createdat
 * @prop {number} finishedat
 */

import { handleNotificationEmail as accept_task_admin_handleNotificationEmail, handleNotificationTelegram as accept_task_admin_handleNotificationTelegram } from './accept_task_admin';
import { connection } from '../db/knex';
import { telegram } from '../services/telegram';
import { sendMessage } from '../mail';

export const notificationTypes = {
    'accept_task_admin': {
        telegram: accept_task_admin_handleNotificationTelegram,
        email: accept_task_admin_handleNotificationEmail
    }
}

export async function notifyTelegramUser(notification, message) {
    const chatId = await connection
        .from('users')
        .where('users.id', notification.params.user_id).first().then((row) => row.telegram_id);
        
    if (chatId == null) {
        return;
    }
    await telegram.sendMessage(chatId, message);
}

export async function notifyEmailUser(notification, message) {
    const email = await connection
        .from('users')
        .where('users.id', notification.params.user_id).first().then((row) => row.email);
        
    if (email == null) {
        return;
    }
    sendMessage(email, message);
}

const DELAY_TIMER = 15 * 1000;
export const registerNotificationHandler = (next) => {
    return async () => {
        try {
            const notifications = await connection.from("notifications").select('*').where('finished_at', null);
    
            for (let notification of notifications) {
                if (notification.notification_type in notificationTypes) {
                    const telegramMessage = notificationTypes[notification.notification_type]?.telegram(notification.params);
                    const emailMessage = notificationTypes[notification.notification_type]?.email(notification.params);

                    // telegram notification
                    try {
                        await notifyTelegramUser(notification, telegramMessage);
                    } catch(e) {
                        console.error(e);
                    }
                    // email notification
                    try {
                        await notifyEmailUser(notification, emailMessage);
                    } catch(e) {
                        console.error(e);
                    }
                }
                
                await connection.from("notifications").update('finished_at', new Date()).where('id', notification.id);
            }
        } catch (e) {
            console.log(e);
        } finally {
            next.next(DELAY_TIMER);
        }
    }
} 