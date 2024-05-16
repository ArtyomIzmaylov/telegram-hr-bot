"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inlineKeyboardCategories = void 0;
const categories_data_1 = require("../data/categories.data");
const telegraf_1 = require("telegraf");
exports.inlineKeyboardCategories = telegraf_1.Markup.inlineKeyboard(categories_data_1.categoriesData
    .map(category => {
    return [telegraf_1.Markup.button.callback(category.title, category.category)
    ];
}));
