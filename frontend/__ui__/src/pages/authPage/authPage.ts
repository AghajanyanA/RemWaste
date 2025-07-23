import { Container } from "@Pom/container";

type InputFieldsType = { username?: string, password?: string, email?: string}

export class AuthPage extends Container {
    private LOCATORS = {
        input: (name: InputFieldsType) => `//input[@data-testid="${name}"]`,
        submitButton: '//button[@data-testid="submit-button"]',
        validationError: '//div[@role="alert"]',
        switchLoginForm: '//button[@data-testid="switch-mode-button"]',
        loginErrorMessage: '//div[@data-testid="error-message"]',
    }

    public async open() {
        await this.page.goto('/');
    }

    public async fill(fieldName: InputFieldsType): Promise<void> {
        fieldName.username && await this.page.fill(this.LOCATORS.input(fieldName), fieldName.username);
        fieldName.password && await this.page.fill(this.LOCATORS.input(fieldName), fieldName.password);
        fieldName.email && await this.page.fill(this.LOCATORS.input(fieldName), fieldName.email);
    }

    public async getAllValidationErrors(): Promise<string[]> {
        return this.page.locator(this.LOCATORS.validationError).allInnerTexts()
    }

    public getLoginErrorMessage(): Promise<string> {
        return this.page.locator(this.LOCATORS.loginErrorMessage).innerText();
    }

    public async clickSubmitButton(): Promise<void> {
        await this.page.click(this.LOCATORS.submitButton);
    }

    public async clickSwitchLoginFormButton(): Promise<void> {
        await this.page.click(this.LOCATORS.switchLoginForm);
    }
}
