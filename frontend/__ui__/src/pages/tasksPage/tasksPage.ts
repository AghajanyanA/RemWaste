import { Container } from "@Pom/container";
import { TodoItem } from "./todoItem/todoItem";
import { Locator } from "@playwright/test";

export class TasksPage extends Container {
    private LOCATORS = {
        title: '//h2',
        addButton: '//button[@data-testid="add-todo-button"]',
        newTaskInput: '//input[@data-testid="new-todo-input"]',
        todoList: '//ul[@data-testid="todo-list"]',
        todoItem: '//li'
    }

    public TodoItem = new TodoItem(this.LOCATORS.todoItem as unknown as Locator, this.page);

    public async getTitle(): Promise<string> {
        return this.page.locator(this.LOCATORS.title).innerText();
    }

    public async getTodoListItems(): Promise<string[]> {
        return this.page.locator(this.LOCATORS.todoList).locator('li').allInnerTexts();
    }
    
    public async clickAddButton(): Promise<void> {
        await this.page.click(this.LOCATORS.addButton);
    }

    public async fillNewTaskInput(task: string): Promise<void> {
        await this.page.fill(this.LOCATORS.newTaskInput, task);
    }

    public async getTodoListCount(): Promise<number> {
        return this.page.locator(this.LOCATORS.todoList).locator('li').count();
    }
}
