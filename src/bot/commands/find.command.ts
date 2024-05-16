import {Command} from "./command.class";
import {Telegraf} from "telegraf";
import {MyContext} from "../context/context.interface";

export class FindCommand extends Command {
    constructor(bot : Telegraf<MyContext>) {
        super(bot);
    }
    handle() {
        this.bot.command('find', async (ctx) => {
            await ctx.reply('Хорошо, сейчас мы будем искать. Выберите подходящие категории')
            await ctx.scene.enter('findScene')
        })
    }

}