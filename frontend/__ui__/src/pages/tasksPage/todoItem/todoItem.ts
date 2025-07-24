import { Component } from "@Pom/component";

export class TodoItem extends Component {
    private LOCATORS = {
        checkbox: this.page.locator('//input[type="checkbox"]'),
        deleteButton: this.page.locator('//button'),
    }

    public async toggleCheckbox(): Promise<void> {
        await this.locator.click();
    }

    public async isChecked(): Promise<boolean> {
        return await this.LOCATORS.checkbox.isChecked();
    }

    public async clickDeleteButton(): Promise<void> {
        await this.LOCATORS.deleteButton.click();
    }
}
