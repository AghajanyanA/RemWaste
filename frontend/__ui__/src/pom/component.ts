import { Locator, Page } from "@playwright/test";

export class Component {
    public constructor(protected locator: Locator, protected page: Page) {}
}
