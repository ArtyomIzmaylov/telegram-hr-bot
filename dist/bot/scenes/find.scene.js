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
const categories_data_1 = require("../data/categories.data");
const fakeApi_placeholder_1 = require("../../placeholder/fakeApi.placeholder");
const firstStep = new telegraf_1.Composer();
const secondStep = new telegraf_1.Composer();
const thirdStep = new telegraf_1.Composer();
firstStep.on('text', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        ctx.scene.session.state.categories = categories_data_1.categoriesData.map(cat => {
            return Object.assign(Object.assign({}, cat), { isSelected: false });
        });
        const markupCategoryKeyboard = ctx.scene.session.state.categories.map(category => {
            if (category.isSelected) {
                return [telegraf_1.Markup.button.callback(category.title + '✅', category.category)];
            }
            return [telegraf_1.Markup.button.callback(category.title, category.category)];
        });
        yield ctx.reply('Выберите категории из этого списка', telegraf_1.Markup.inlineKeyboard(markupCategoryKeyboard));
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
    ctx.scene.session.state.categories = ctx.scene.session.state.categories.map(cat => {
        if (cat.category === category) {
            cat.isSelected = !cat.isSelected;
        }
        return cat;
    });
    const markupCategoryKeyboard = ctx.scene.session.state.categories.map(category => {
        if (category.isSelected) {
            return [telegraf_1.Markup.button.callback(category.title + '✅', category.category)];
        }
        return [telegraf_1.Markup.button.callback(category.title, category.category)];
    });
    yield ctx.editMessageReplyMarkup({
        inline_keyboard: markupCategoryKeyboard
    });
    console.log(ctx.scene.session.state.categories);
}));
secondStep.hears('Готово', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = JSON.parse(yield (0, fakeApi_placeholder_1.postRequest)());
        if (response.status === 200) {
            yield ctx.reply(`От сервера пришёл успешный ответ ${response.status}. Следовательно, данные были отправлены на бэкэнд успешно.`);
            yield ctx.reply(response.data[0]);
            yield ctx.reply(response.data[1]);
            yield ctx.reply(response.data[2]);
            yield ctx.scene.leave();
        }
    }
    catch (e) {
        yield ctx.scene.leave();
    }
}));
exports.stage = new telegraf_1.Scenes.Stage([findScene]);
