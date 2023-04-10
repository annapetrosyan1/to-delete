require("dotenv").config();
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { connection, userQuery } from "../db/knex";



export const botFactory = () => {
  const bot = new Telegraf(process.env.BOT_TOKEN);

  bot.start((ctx) =>
    ctx.reply("Добро пожаловать!\nДля авторизации введите свой email: ")
  );

  bot.on(message("text"), async (ctx) => {
    const emailFromTg = ctx.message.text;
    const tgId = ctx.chat.id;
    //const userList = await userListQuery();
    // console.log(userList) //все пользователи из бд

    const matchedUsers = await userQuery(emailFromTg);
    console.log(matchedUsers);
    try {
      if (matchedUsers?.length > 0) {
        await ctx.reply("Теперь вы будете получать уведомления о событиях");
        await connection.from('users').update('telegram_id', (await ctx.getChat()).id).where('email', emailFromTg);
      } else {
        await ctx.reply("Пользователь с таким email не найден");
      }
    } catch (e) {
      throw new e();
    }
  });

  return bot;
};

