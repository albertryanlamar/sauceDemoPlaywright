import { loadEnvFile } from 'node:process';
import { BasePage } from './BasePage';
import { Locator, Page,expect } from '@playwright/test';
import { Action } from '../helpers/Action';

export class CartPage extends BasePage {

    private cartItem:Locator;
    private chckOutButton:Locator;
    private cancelButton:Locator;
    private act:Action;


    constructor(page:Page){
        super(page);
        this.cartItem = page.locator('div.cart_item');
        this.chckOutButton = page.getByRole('button', { name: 'Checkout' });
        this.act = new Action();
    }
    

    //
    async clickCheckoutButton(){
        await this.act.clickAction(this.chckOutButton);
    }
    
    //flow

    async checkOut():Promise<CartPage>{
        await this.clickCheckoutButton();
        await this.page.waitForLoadState('load');
        expect(this.page.getByText('Checkout: Your Information')).toBeVisible();
        return this;
    }
    async checkCart(itemname:string[]){

        this.page.waitForLoadState("load");
        let found = false;

        const count = await this.cartItem.count();

        for (const ads of itemname){
            console.log(`Checking in the cart item:${ads}`)

            for(let i= 0; i < count; i++){
                const name = await this.cartItem.nth(i).locator('[data-test="inventory-item-name"]').textContent();
                if(name?.trim()===ads){
                    expect(name).toBe(ads)
                    found = true;
                    break;
                }
            }
        if (!found) {
                throw new Error(`Item "${ads }" not found in cart`);
        }
       }

    }
    


   

}