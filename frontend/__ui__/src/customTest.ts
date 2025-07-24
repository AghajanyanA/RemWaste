import {test as base, expect } from "@playwright/test";
import {AuthPage} from "./pages/authPage/authPage";
import {TasksPage} from "./pages/tasksPage/tasksPage";

type OptionsType = {
    authPage: AuthPage,
    tasksPage: TasksPage,
};

const test = base.extend<OptionsType>({
    authPage: async ({page}, use) => {
        await use(new AuthPage(page));
    },
    tasksPage: async ({page}, use) => {
        await use(new TasksPage(page));
    },
});

export { test, expect };
