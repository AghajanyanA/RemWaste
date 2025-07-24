import { test, expect } from "@Test"

test.describe('Login Page', () => {
    test("Login form", async ({authPage}) => {
        await authPage.open();
        expect(authPage.getTitle()).toEqual("Login");
        await expect(await authPage.getInput('Username')).toHaveValue("");
        await expect(await authPage.getInput('Password')).toHaveValue("");
        expect(authPage.getAllValidationErrors()).toEqual(["", ""]);
        await authPage.fill('Username', 'as');
        await authPage.fill('Password', '1234');
        expect(authPage.getAllValidationErrors()).toEqual([
            "Username must be at least 3 characters",
            "Password must be at least 6 characters",
        ]);

        await authPage.clickSubmitButton();
        expect(authPage.getLoginErrorMessage()).toEqual("Something went wrong");

        await authPage.fill('Username', 'Test');
        await authPage.fill('Password', '123456');
        await authPage.clickSubmitButton();

        expect(authPage.isVisible()).toBe(false);
    });

    test("Register form", async ({authPage}) => {
        await authPage.open();
        expect(authPage.getTitle()).toEqual("Login");
        await authPage.clickSwitchLoginFormButton();
        expect(authPage.getTitle()).toEqual("Register");


        await expect(await authPage.getInput('Username')).toHaveValue("");
        await expect(await authPage.getInput('Password')).toHaveValue("");
        await expect(await authPage.getInput('Email')).toHaveValue("");
        expect(authPage.getAllValidationErrors()).toEqual(["", "", ""]);


        await authPage.fill('Username', 'na');
        await authPage.fill('Email', 'NotEmail');
        await authPage.fill('Password', '1234');

        expect(authPage.getAllValidationErrors()).toEqual([
            "Username must be at least 3 characters",
            "Invalid email address",
            "Password must be at least 6 characters",
        ]);

        await authPage.clickSubmitButton();
        expect(authPage.getLoginErrorMessage()).toEqual("Something went wrong");

        await authPage.fill('Username', 'Jackson');
        await authPage.fill('Email', 'jackson@gmail.com');
        await authPage.fill('Password', 'oregon');
        await authPage.clickSubmitButton();

        expect(authPage.isVisible()).toBe(false);
    })
});