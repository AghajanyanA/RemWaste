import { Component } from "@Pom/component";

export class TodoItem extends Component {
    private LOCATORS = {
        checkbox: '//input[type="checkbox"]',
        deleteButton: '//button',
    }

    public async toggleCheckbox(): Promise<void> {
        await this.locator.click();
    }

    public async isChecked(): Promise<boolean> {
        return await this.locator.locator(this.LOCATORS.checkbox).isChecked();
    }

    public async clickDeleteButton(): Promise<void> {
        await this.locator.locator(this.LOCATORS.deleteButton).click();
    }
}
