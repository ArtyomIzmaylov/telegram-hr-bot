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
exports.stage = void 0;
const telegraf_1 = require("telegraf");
const categories_keyboard_1 = require("../keyboard/categories.keyboard");
const firstStep = new telegraf_1.Composer();
const secondStep = new telegraf_1.Composer();
const thirdStep = new telegraf_1.Composer();
firstStep.on('text', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        ctx.scene.session.state.selectedCategories = [];
        yield ctx.reply('Выберите категории из этого списка', categories_keyboard_1.inlineKeyboardCategories);
        yield ctx.reply('Как выберите категории, можете продолжить', telegraf_1.Markup.keyboard([
            [telegraf_1.Markup.button.callback('Готово', 'findReady')],
        ]).oneTime().resize());
        yield ctx.wizard.next();
    }
    catch (e) {
        yield ctx.reply('Произошла ошибка. Подождите пока исправим.');
        yield ctx.scene.leave();
    }
}));
const findScene = new telegraf_1.Scenes.WizardScene("findScene", firstStep, secondStep);
secondStep.action(/designer|marketing|createSite|producer|target|smm|copywriter|scenarist|assistant|realsVideoMaker/, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const category = ctx.match.input;
    if (ctx.scene.session.state.selectedCategories.includes(category)) {
        ctx.scene.session.state.selectedCategories = ctx.scene.session.state.selectedCategories.filter(cat => cat !== category);
    }
    else {
        ctx.scene.session.state.selectedCategories = [...ctx.scene.session.state.selectedCategories, category];
    }
    console.log(ctx.scene.session.state.selectedCategories);
}));
exports.stage = new telegraf_1.Scenes.Stage([findScene]);
