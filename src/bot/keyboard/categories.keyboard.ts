import {categoriesData} from "../data/categories.data";
import {Markup} from "telegraf";


export const inlineKeyboardCategories = Markup.inlineKeyboard(
    categoriesData
        .map(
            category => {
                return [Markup.button.callback(category.title, category.category)
                ]
            })
)