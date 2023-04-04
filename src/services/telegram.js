import { Telegraf } from "telegraf";

export const telegraf = new Telegraf(process.env.BOT_TOKEN);
export const telegram = telegraf.telegram;