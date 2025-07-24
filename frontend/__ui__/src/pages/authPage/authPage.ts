import { Container } from "@Pom/container";

type InputFieldsType = { username?: string, password?: string, email?: string}

export class AuthPage extends Container {
    private LOCATORS = {
        input: (name: InputFieldsType) => this.page.locator(`//input[@data-testid="${name}"]`),
        submitButton: this.page.locator('//button[@data-testid="submit-button"]'),
        validationError: this.page.locator('//div[@role="alert"]'),
        switchLoginForm: this.page.locator('//button[@data-testid="switch-mode-button"]'),
        loginErrorMessage: this.page.locator('//div[@data-testid="error-message"]'),
    }

    public async open() {
        await this.page.goto('/');
    }

    public async fill(fieldName: InputFieldsType): Promise<void> {
        fieldName.username && await this.page.fill(fieldName.username, fieldName.username);
        fieldName.password && await this.page.fill(fieldName.password, fieldName.password);
        fieldName.email && await this.page.fill(fieldName.email, fieldName.email);
    }

    public async getAllValidationErrors(): Promise<string[]> {
        return this.LOCATORS.validationError.allInnerTexts()
    }

    public getLoginErrorMessage(): Promise<string> {
        return this.LOCATORS.loginErrorMessage.innerText();
    }

    public async clickSubmitButton(): Promise<void> {
        await this.LOCATORS.submitButton.click();
    }

    public async clickSwitchLoginFormButton(): Promise<void> {
        await this.LOCATORS.switchLoginForm.click;
    }
}
