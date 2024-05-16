import {Context, Markup, Scenes} from "telegraf";
import {ICategory} from "../data/categories.data";
import {inlineKeyboardCategories} from "../keyboard/categories.keyboard";
import {InlineKeyboardButton} from "@telegraf/types";


interface MyWizardSession extends Scenes.WizardSessionData {
    state : {
        categories : any[]
        /*selectedCategories: string[]; //надо добавить интерфейс категорий
        inlineKeyboardCategories : Markup<InlineKeyboardButton>*/
    }
}

interface MySession extends Scenes.WizardSession<MyWizardSession> {
    selectedCategories: string[];
}

export interface MyContext extends Context {
    myContextProp: string;
    session: MySession;
    scene: Scenes.SceneContextScene<MyContext, MyWizardSession>;
    wizard: Scenes.WizardContextWizard<MyContext>;
}