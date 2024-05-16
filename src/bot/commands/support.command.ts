import {Command} from "./command.class";
import {Telegraf} from "telegraf";
import {supportCommandMessage} from "../messages/support.command.message";
import {MyContext} from "../context/context.interface";

export class SupportCommand extends Command {
    constructor(bot : Telegraf<MyContext>) {
        super(bot);
    }
    handle() {
        this.bot.command('support',async (ctx) => {
            await ctx.reply(supportCommandMessage)
        })
    }
}