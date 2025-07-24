import { test, expect } from "@Test";
import { faker } from "@faker-js/faker";

test.describe("Todos Page Tests", () => {
    test.beforeEach(async ({ tasksPage, authPage }) => {
        const username = faker.person.firstName();
        const email = faker.internet.email();
        const password = faker.internet.password();

        await authPage.open();
        await authPage.clickSwitchLoginFormButton();
        await authPage.fill("Username", username);
        await authPage.fill("Email", email);
        await authPage.fill("Password", password);
        await authPage.clickSubmitButton();

        expect(await tasksPage.getTitle()).toBe("Your Todos");
        expect(await tasksPage.getTodoListCount()).toBe(0);

        await tasksPage.fillNewTaskInput("Initial Task");
        expect(await tasksPage.getTodoListCount()).toBe(1);
        expect(await tasksPage.getTodoListItems()).toEqual(["Initial Task"]);

        const [firstTodoItem] = await tasksPage.getTodoItems();

        expect(await firstTodoItem.isChecked()).toBe(false);
        await firstTodoItem.toggleCheckbox();
        expect(await firstTodoItem.isChecked()).toBe(true);
        
        await firstTodoItem.clickDeleteButton();
        expect(await tasksPage.getTodoListCount()).toBe(0);
    });
});