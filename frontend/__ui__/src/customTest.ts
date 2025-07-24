import {test as base, expect } from "@playwright/test";
import {AuthPage} from "./pages/authPage/authPage";
import {TodosPage} from "./pages/tasksPage/todosPage";

type OptionsType = {
    authPage: AuthPage,
    tasksPage: TodosPage,
};

const test = base.extend<OptionsType>({
    authPage: async ({page}, use) => {
        await use(new AuthPage(page));
    },
    tasksPage: async ({page}, use) => {
        await use(new TodosPage(page));
    },
});

export { test, expect };
