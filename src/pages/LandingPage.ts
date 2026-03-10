import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Action } from "../helpers/Action";

export class LandingPage extends BasePage {
    
    private menuButton:Locator;
    private menuAllItems:Locator;
    private menuAbout:Locator;
    private menuLogout:Locator
    private menuResetAppState:Locator;
    private menuCloseButton:Locator;
    private addToCartButton:Locator;
    private itemsLocatort:Locator;
    private viewCartMenu:Locator;
    private act:Action;

   constructor(page:Page){
        super(page);
        this.menuButton = this.page.getByRole('button', { name: 'Open Menu' });
        this.menuAllItems = this.page.getByRole('link', { name: 'All Items' });
        this.menuAbout = this.page.getByRole('link', { name: 'About' });
        this.menuLogout = this.page.getByRole('link', { name: 'Logout' });
        this.menuResetAppState = this.page.getByRole('link', { name: 'Reset App State' });
        this.menuCloseButton = this.page.getByRole('button', { name: 'Close Menu' });
        this.itemsLocatort = this.page.locator('div.inventory_item');
        this.act = new Action();
        this.viewCartMenu = this.page.locator('[data-test="shopping-cart-link"]')
        
   }
    
    //actions
    async clickMenuButton(){
        await this.act.clickAction(this.menuButton);
    }
    async cliclLogoutButton(){
        await this.act.clickAction(this.menuLogout);
    }
    
    async clickAddToCartButton(locator:Locator) {
        await this.act.clickAction(locator);
    }

    //flow
    async clickViewCart(){
        await this.act.clickAction(this.viewCartMenu);
        expect(this.page.getByText('Your Cart', { exact: true })).toBeVisible();
    }
    async selectItem(itemName:string[]){
        for(const countItem of itemName){
            for(let i=0;i<await this.itemsLocatort.count();i++){
                const item = this.itemsLocatort.nth(i);
                const name = await item.locator('.inventory_item_name').textContent();
                if(name?.trim() === countItem) {
                    await this.clickAddToCartButton(item.getByRole('button', { name: 'Add to cart' })); 
                    break;
                }     
            }
        }
    }

    async logout(){
        await this.clickMenuButton();
        await this.cliclLogoutButton();
        await this.page.waitForLoadState('load');
        await expect(this.page).toHaveTitle('Swag Labs');
    }


}