import { Page , Locator,expect} from "@playwright/test";
import { BasePage } from "./BasePage";
import { Action } from "../helpers/Action";

export class CheckoutPage extends BasePage{


     private fnameTxtBox:Locator;
     private lnameTxtBox:Locator;
     private zipTxtBox:Locator;
     private act:Action;
     private checkoutButton:Locator;
     private finishButton:Locator;
     private cartItem:Locator;
     private paymentInfo:Locator;
     private shippingInfo:Locator;
     private itemtotal:Locator;
     private successTitle:Locator;



    constructor(page:Page){
        super(page);
        this.act = new Action();
        this.fnameTxtBox = this.page.getByRole('textbox', { name: 'First Name' });
        this.lnameTxtBox = this.page.getByRole('textbox', { name: 'Last Name' })
        this.zipTxtBox = this.page.getByRole('textbox', { name: 'Zip/Postal Code' });
        this.checkoutButton = this.page.locator('[data-test="continue"]');
        this.finishButton = this.page.getByRole('button', { name: 'Finish' });
        this.cartItem = this.page.locator('div.cart_item');
        this.paymentInfo = this.page.locator('[data-test="payment-info-value"]');
        this.shippingInfo = this.page.locator('[data-test="shipping-info-value"]');
        this.itemtotal = this.page.locator('[data-test="subtotal-label"]');
        this.successTitle = this.page.locator('[data-test="title"]');
    }

    //action
    async enterFirstName(firstName:string){
        await this.act.inputAction(this.fnameTxtBox,firstName);
    }

    async enterLastName(lastName:string){
        await this.act.inputAction(this.lnameTxtBox,lastName);
    }

    async enterZipCode(zipCode:string){
        await this.act.inputAction(this.zipTxtBox,zipCode);
    }

    async clickCheckoutButton(){
        await this.act.clickAction(this.checkoutButton);
    }
    async clickFinishButton(){
        await this.act.clickAction(this.finishButton);
    }


    //flow
    async fillOutForm(firstName:string,lastName:string,zipCode:string):Promise<void>{
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
        await this.enterZipCode(zipCode);
        await this.clickCheckoutButton();
        await this.page.waitForLoadState('load');
        expect(this.page.getByText('Checkout: Overview')).toBeVisible();
    }

    //checoutOverview
    async checkoutOverview(){
        const count = await this.cartItem.count();
        let totalprice = 0;
        for(let i=0;i<count;i++){
            const itemprice = await this.cartItem.nth(i).locator('.inventory_item_price').textContent();
            totalprice += parseFloat(itemprice);
    
        }
        await expect(this.paymentInfo).toBeVisible();
        await expect(this.shippingInfo).toBeVisible();
        const total = await this.itemtotal.textContent();
        expect(parseFloat(total)).toBe(totalprice);
        await this.clickFinishButton();
        await this.page.waitForLoadState('load');
        await expect(this.successTitle).toBeVisible();
        await expect(this.page.getByText('Thank you for your order!')).toBeVisible();
        
    }
        

}