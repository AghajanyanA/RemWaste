import { Container } from "@Pom/container";
import { TodoItem } from "./todoItem/todoItem";

export class TodosPage extends Container {
    private LOCATORS = {
        title: this.page.locator('//h2'),
        addButton: this.page.locator('//button[@data-testid="add-todo-button"]'),
        newTaskInput: this.page.locator('//input[@data-testid="new-todo-input"]'),
        todoList: this.page.locator('//ul[@data-testid="todo-list"]'),
        todoItem: this.page.locator('//li')
    }

    public TodoItem = new TodoItem(this.LOCATORS.todoItem, this.page);

    public async getTitle(): Promise<string> {
        return this.LOCATORS.title.textContent();
    }

    public async getTodoListItems(): Promise<string[]> {
        return this.LOCATORS.todoList.locator('li').allInnerTexts();
    }
    
    public async clickAddButton(): Promise<void> {
        await this.LOCATORS.addButton.click();
    }

    public async fillNewTaskInput(task: string): Promise<void> {
        await this.LOCATORS.newTaskInput.fill(task);
    }

    public async getTodoListCount(): Promise<number> {
        return this.LOCATORS.todoList.locator('li').count();
    }
}
