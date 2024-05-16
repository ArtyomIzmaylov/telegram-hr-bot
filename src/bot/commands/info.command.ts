import {Command} from "./command.class";
import {Telegraf} from "telegraf";
import {MyContext} from "../context/context.interface";
import {infoCommandMessage} from "../messages/info.command.message";

export class InfoCommand extends Command {
    constructor(bot : Telegraf<MyContext>) {
        super(bot);
    }
    handle() {
        this.bot.command('info', async (ctx) => {
            await ctx.reply(infoCommandMessage)
        })
    }
}