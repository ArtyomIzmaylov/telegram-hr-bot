import {session, Telegraf} from "telegraf";
import {ConfigService} from "./config.service";
import {MyContext} from "./bot/context/context.interface";
import {Command} from "./bot/commands/command.class";
import {IConfigService} from "./config.interface";
import {StartCommand} from "./bot/commands/start.command";
import {InfoCommand} from "./bot/commands/info.command";
import {SupportCommand} from "./bot/commands/support.command";
import {FindCommand} from "./bot/commands/find.command";
import {stage} from "./bot/scenes/find.scene";
import {MessagesCommand} from "./bot/commands/messages.command";


class Bot {
    bot : Telegraf<MyContext>;
    commands : Command[] = [];
    constructor(private readonly configService : IConfigService) {
        this.bot = new Telegraf<MyContext>(this.configService.get('TOKEN'));
    }
    init() {
        this.bot.use(session())
        this.bot.use(stage.middleware())
        this.commands = [
            new StartCommand(this.bot),
            new FindCommand(this.bot),
            new InfoCommand(this.bot), new SupportCommand(this.bot), new MessagesCommand(this.bot)]
        for (const command of this.commands) {
            command.handle()
        }

        this.bot.launch()
    }

}


const bot = new Bot(new ConfigService())
bot.init()


