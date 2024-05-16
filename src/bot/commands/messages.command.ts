import {Command} from "./command.class";
import {Telegraf} from "telegraf";
import {MyContext} from "../context/context.interface";

function sendMessageToUser(bot : Telegraf<MyContext>, userId : number, messageText : string) {
    bot.telegram.sendMessage(userId, messageText);
}

export class MessagesCommand extends Command {
    constructor(bot : Telegraf<MyContext>) {
        super(bot);
    }
    handle() {
        this.bot.command('messages', async (ctx) => {
            setTimeout(() => {
                sendMessageToUser(this.bot, ctx.message.from.id, 'Привет это колбэк')
            }, 5000)
        })
    }
}