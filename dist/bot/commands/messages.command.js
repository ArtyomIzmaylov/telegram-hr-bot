"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesCommand = void 0;
const command_class_1 = require("./command.class");
function sendMessageToUser(bot, userId, messageText) {
    bot.telegram.sendMessage(userId, messageText);
}
class MessagesCommand extends command_class_1.Command {
    constructor(bot) {
        super(bot);
    }
    handle() {
        this.bot.command('messages', (ctx) => __awaiter(this, void 0, void 0, function* () {
            setTimeout(() => {
                sendMessageToUser(this.bot, ctx.message.from.id, 'Привет это колбэк');
            }, 5000);
        }));
    }
}
exports.MessagesCommand = MessagesCommand;
