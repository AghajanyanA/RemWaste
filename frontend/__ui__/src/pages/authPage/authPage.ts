import { Container } from "@Pom/container";
import { Locator } from "@playwright/test";

type InputFieldsType = "username" | "password" | 'email';

export class AuthPage extends Container {
    private LOCATORS = {
        input: (name: InputFieldsType) => this.page.locator(`//input[@data-testid="${name}-input"]`),
        submitButton: this.page.locator('//button[@data-testid="submit-button"]'),
        validationError: this.page.locator('//div[@role="alert"]'),
        switchLoginForm: this.page.locator('//button[@data-testid="switch-mode-button"]'),
        title: this.page.locator('//h2'),
    }

    public async open() {
        await this.page.goto('/', {waitUntil: 'networkidle'});
    }

    public async fill(fieldName: InputFieldsType, value: string): Promise<void> {
        await this.LOCATORS.input(fieldName).fill(value);
        await this.page.mouse.click(5, 5);
    }

    public async getAllValidationErrors(): Promise<string[]> {
        return this.LOCATORS.validationError.allTextContents();
    }

    public async clickSubmitButton(): Promise<void> {
        await this.LOCATORS.submitButton.click({force: true});
        await this.page.waitForLoadState('domcontentloaded', {timeout: 5000});
    }

    public async clickSwitchLoginFormButton(): Promise<void> {
        await await this.LOCATORS.switchLoginForm.click();
    }

    public async getTitle(): Promise<string> {
        return await this.LOCATORS.title.textContent();
    }

    public async getInput(fieldName: InputFieldsType): Promise<Locator> {
        return  this.LOCATORS.input(fieldName);
    }

    public async isVisible(): Promise<boolean> {
        return await this.page.isVisible('//main[//h2[contains(text(), "Login") or contains(text(), "Register")]]');
    }
}
