import {Composer, Markup, Scenes} from "telegraf";
import {MyContext} from "../context/context.interface";
import {inlineKeyboardCategories} from "../keyboard/categories.keyboard";
import {categoriesData} from "../data/categories.data";


const firstStep = new Composer<MyContext>();
const secondStep = new Composer<MyContext>();
const thirdStep = new Composer<MyContext>();

firstStep.on('text', async (ctx) => {
    try {
        ctx.scene.session.state.categories = categoriesData.map(cat => {
            return {...cat, isSelected : false}
        })
        const markupCategoryKeyboard = ctx.scene.session.state.categories.map(
            category => {
                if (category.isSelected) {
                    return [Markup.button.callback(category.title + '✅', category.category)]
                }
                return [Markup.button.callback(category.title + '-НЕ-', category.category)]
            })

        await ctx.reply('Выберите категории из этого списка', Markup.inlineKeyboard(markupCategoryKeyboard))
        await ctx.reply('Как выберите категории, можете продолжить', Markup.keyboard([
                [Markup.button.callback('Готово', 'findReady')],
            ],).oneTime().resize())
        await ctx.wizard.next()
    }
    catch (e) {
        await ctx.reply('Произошла ошибка. Подождите пока исправим.')
        await ctx.scene.leave()
    }

})

const findScene = new Scenes.WizardScene<MyContext>(
    "findScene",
    firstStep,
    secondStep
);

secondStep.action(/designer|marketing|createSite|producer|target|smm|copywriter|scenarist|assistant|realsVideoMaker/, async (ctx) => {
    const category = ctx.match.input;
    ctx.scene.session.state.categories = ctx.scene.session.state.categories.map(cat => {
        if (cat.category === category) {
            cat.isSelected = !cat.isSelected
        }
        return cat
    })
    const markupCategoryKeyboard = ctx.scene.session.state.categories.map(
        category => {
            if (category.isSelected) {
                return [Markup.button.callback(category.title + '✅', category.category)]
            }
            return [Markup.button.callback(category.title + '-НЕ-', category.category)]
        })

    await ctx.editMessageReplyMarkup({
        inline_keyboard: markupCategoryKeyboard
    });
});

export const stage = new Scenes.Stage<MyContext>([findScene]);
