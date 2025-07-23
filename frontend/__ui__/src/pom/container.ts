import { Page } from "@playwright/test";

export class Container {
    public constructor(protected readonly page: Page) {}
}