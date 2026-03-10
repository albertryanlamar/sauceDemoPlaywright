import { Locator, Page,TestInfo,expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Action } from "../helpers/Action";
import { LandingPage } from "./LandingPage";

export class LoginPage extends BasePage {
    private usernameTextBox:Locator;
    private passwordTextBox:Locator;
    private loginButton:Locator;
    private act:Action;
    private txtErrorMessage:Locator;

    constructor(page: Page) {
        super(page);
        this.usernameTextBox = this.page.getByRole('textbox', { name: 'Username' });
        this.passwordTextBox = this.page.getByRole('textbox', { name: 'Password' });
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
        this.act = new Action();
        this.txtErrorMessage = this.page.locator('div.error-message-container.error');     
    }
    //page actions 
    async enterUsername(username: string) {
       await this.act.inputAction(this.usernameTextBox,username);
    }

    async enterPassword(password: string) {
      await this.act.inputAction(this.passwordTextBox,password);
    }

    async clickLoginButton():Promise<LandingPage> {
      await this.act.clickAction(this.loginButton);
      return new LandingPage(this.page);
    }
    async getloginErrorMessage():Promise<null | string>{
       
        return(this.txtErrorMessage.textContent());
    }
    //
    async Login(username:any, password:any, invalid:boolean ,stepValue?:any, testInfo?:any) {
    
        await this.openWebsite();
        await this.enterUsername(await username.toString());
        await this.enterPassword(await password.toString());
        await this.clickLoginButton();
        
        if (invalid) {
          await this.page.waitForLoadState('load'); 
          await expect(this.page).toHaveTitle('Swag Labs');
        }else{
           expect(await this.getloginErrorMessage()).toBe('Epic sadface: Username and password do not match any user in this service');
        }
     
      }

}