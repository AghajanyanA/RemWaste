import { Container } from "@Pom/container";
import { Locator } from "@playwright/test";

type InputFieldsType = "Username" | "Password" | 'Email';

export class AuthPage extends Container {
    private LOCATORS = {
        input: (name: InputFieldsType) => this.page.locator(`//input[@data-testid="${name}"]`),
        submitButton: this.page.locator('//button[@data-testid="submit-button"]'),
        validationError: this.page.locator('//div[@role="alert"]'),
        switchLoginForm: this.page.locator('//button[@data-testid="switch-mode-button"]'),
        loginErrorMessage: this.page.locator('//div[@data-testid="error-message"]'),
        title: this.page.locator('//h2'),
    }

    public async open() {
        await this.page.goto('/');
    }

    public async fill(fieldName: InputFieldsType, value: string): Promise<void> {
        await this.LOCATORS.input(fieldName).fill(value)
    }

    public async getAllValidationErrors(): Promise<string[]> {
        return this.LOCATORS.validationError.allTextContents()
    }

    public async getLoginErrorMessage(): Promise<string> {
        return this.LOCATORS.loginErrorMessage.textContent();
    }

    public async clickSubmitButton(): Promise<void> {
        await this.LOCATORS.submitButton.click();
    }

    public async clickSwitchLoginFormButton(): Promise<void> {
        await this.LOCATORS.switchLoginForm.click();
    }

    public async getTitle(): Promise<string> {
        return this.LOCATORS.title.textContent();
    }

    public async getInput(fieldName: InputFieldsType): Promise<Locator> {
        return this.LOCATORS.input(fieldName);
    }

    public async isVisible(): Promise<boolean> {
        return this.page.isVisible('//main[//h2[contains(text(), "Login") or contains(text(), "Register")]]');
    }
}
