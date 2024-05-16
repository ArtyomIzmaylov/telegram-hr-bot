import {Telegraf} from "telegraf";
import {Command} from "./command.class";
import {MyContext} from "../context/context.interface";
import {startCommandMessage} from "../messages/start.command.message";


export class StartCommand extends Command {
    constructor(bot : Telegraf<MyContext>) {
        super(bot);
    }
    handle() {
        this.bot.start(async (ctx) => {
            await ctx.reply(startCommandMessage)
        })
    }
}