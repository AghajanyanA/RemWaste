import { test, expect } from "@Test"

test.describe('Login Page', () => {
    test("Login form", async ({authPage}) => {
        await authPage.open();
        expect(await authPage.getTitle()).toEqual("Login");
        await expect(await authPage.getInput('username')).toHaveValue("");
        await expect(await authPage.getInput('password')).toHaveValue("");
        expect(await authPage.getAllValidationErrors()).toEqual(["", ""]);
        await authPage.fill('username', 'as');
        await authPage.fill('password', '1234');
        expect(async () => expect(await authPage.getAllValidationErrors()).toEqual([
            "Username must be at least 3 characters",
            "Password must be at least 6 characters",
        ])).toPass();

        await authPage.clickSubmitButton();

        await authPage.fill('username', 'Test');
        await authPage.fill('password', '123456');
        await authPage.clickSubmitButton();

        expect(await authPage.isVisible()).toBe(false);
    });

    test("Register form", async ({authPage}) => {
        await authPage.open();
        expect(await authPage.getTitle()).toEqual("Login");
        await authPage.clickSwitchLoginFormButton();
        expect(await authPage.getTitle()).toEqual("Register");


        await expect(await authPage.getInput('username')).toHaveValue("");
        await expect(await authPage.getInput('password')).toHaveValue("");
        await expect(await authPage.getInput('email')).toHaveValue("");
        expect(await authPage.getAllValidationErrors()).toEqual(["", "", ""]);


        await authPage.fill('username', 'na');
        await authPage.fill('email', 'NotEmail');
        await authPage.fill('password', '1234');

        expect(async () => expect(await authPage.getAllValidationErrors()).toEqual([
            "Username must be at least 3 characters",
            "Invalid email address",
            "Password must be at least 6 characters",
        ])).toPass();

        await authPage.clickSubmitButton();

        await authPage.fill('username', 'Jackson');
        await authPage.fill('email', 'jackson@gmail.com');
        await authPage.fill('password', 'oregon');
        await authPage.clickSubmitButton();

        expect(async () => expect(await authPage.isVisible()).toBe(false)).toPass();
    })
});
