import { Page } from "@playwright/test";

export class BasePage {
  
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private async navigate(){
     await this.page.goto(process.env.URL);
  }

  async openWebsite(){
    await this.navigate();
    await this.page.waitForLoadState('load');
  }

}