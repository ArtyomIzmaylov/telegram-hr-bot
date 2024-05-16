import {Composer, Markup, Scenes} from "telegraf";
import {MyContext} from "../context/context.interface";
import {inlineKeyboardCategories} from "../keyboard/categories.keyboard";
import {categoriesData} from "../data/categories.data";


const firstStep = new Composer<MyContext>();
const secondStep = new Composer<MyContext>();
const thirdStep = new Composer<MyContext>();

firstStep.on('text', async (ctx) => {
    try {
        ctx.scene.session.state.selectedCategories = []
        ctx.scene.session.state.categories = inlineKeyboardCategories
        await ctx.reply('Выберите категории из этого списка', inlineKeyboardCategories)
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
    if (ctx.scene.session.state.selectedCategories.includes(category)) {
        ctx.scene.session.state.selectedCategories = ctx.scene.session.state.selectedCategories.filter(cat => cat !== category)
    }
    else {
        ctx.scene.session.state.selectedCategories = [...ctx.scene.session.state.selectedCategories, category]
    }
    console.log(ctx.scene.session.state.selectedCategories)
    await ctx.reply('')

});

export const stage = new Scenes.Stage<MyContext>([findScene]);
