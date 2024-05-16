"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const config_service_1 = require("./config.service");
const start_command_1 = require("./bot/commands/start.command");
const info_command_1 = require("./bot/commands/info.command");
const support_command_1 = require("./bot/commands/support.command");
const find_command_1 = require("./bot/commands/find.command");
const find_scene_1 = require("./bot/scenes/find.scene");
const messages_command_1 = require("./bot/commands/messages.command");
class Bot {
    constructor(configService) {
        this.configService = configService;
        this.commands = [];
        this.bot = new telegraf_1.Telegraf(this.configService.get('TOKEN'));
    }
    init() {
        this.bot.use((0, telegraf_1.session)());
        this.bot.use(find_scene_1.stage.middleware());
        this.commands = [
            new start_command_1.StartCommand(this.bot),
            new find_command_1.FindCommand(this.bot),
            new info_command_1.InfoCommand(this.bot), new support_command_1.SupportCommand(this.bot), new messages_command_1.MessagesCommand(this.bot)
        ];
        for (const command of this.commands) {
            command.handle();
        }
        this.bot.launch();
    }
}
const bot = new Bot(new config_service_1.ConfigService());
bot.init();
