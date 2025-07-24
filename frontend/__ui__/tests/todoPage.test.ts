import { test, expect } from "@Test";
import { faker } from "@faker-js/faker";

test.describe("Todos Page Tests", () => {
    test("Register | Add, edit, delete todos", async ({ tasksPage, authPage }) => {
        const username = faker.person.firstName();
        const email = faker.internet.email();
        const password = faker.internet.password();

        await authPage.open();
        await authPage.clickSwitchLoginFormButton();
        await authPage.fill("username", username);
        await authPage.fill("email", email);
        await authPage.fill("password", password);
        await authPage.clickSubmitButton();

        expect(async () => expect(await tasksPage.getTitle()).toBe("Your Todos")).toPass();
        expect(await tasksPage.getTodoListCount()).toBe(0);

        await tasksPage.fillNewTaskInput("Initial Task");
        await tasksPage.clickAddButton();
        expect(async () => expect(await tasksPage.getTodoListCount()).toBe(1)).toPass();
        expect(await tasksPage.getTodoListItems()).toEqual(["Initial Task"]);

        const [firstTodoItem] = await tasksPage.getTodoItems();

        expect(await firstTodoItem.isChecked()).toBe(false);
        await firstTodoItem.toggleCheckbox();
        expect(async () => expect(await firstTodoItem.isChecked()).toBe(true)).toPass();
        
        await firstTodoItem.clickDeleteButton();
        expect(async () => expect(await tasksPage.getTodoListCount()).toBe(0)).toPass();
    });
});
