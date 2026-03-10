import { LoginPage } from "../pages/LoginPage";
import { LandingPage } from "../pages/LandingPage";
import { CartPage } from "../pages/CartPage"
import { CheckoutPage } from "../pages/CheckoutPage";
import { RandomDataUtil } from "./RandomDataUtil";

/*
================================================
                Test Execute
================================================
Author: Albert Ryan Lamar
*/

export class TestExecute {

    itemname: string[];
    steps: Record<string, Function>;

    /*
    async stepExecute(stepValue: string, page: any, testInfo: any) {
        
        // Initialize page objects
        const loginPage = new LoginPage(page);
        const landingPage = new LandingPage(page);
        const cartPage = new CartPage(page);

        const actionPart = stepValue.split('_');
        const actionKeyword = actionPart[0].toLowerCase();
        const params:string[] = actionPart.slice(1);

        console.log("Executing step: " + stepValue);

        if(actionKeyword === 'login'){
            console.log("This is a login step.");         
            console.log("Attempting login with username: " + process.env.APP_USERNAME);
            await loginPage.Login(process.env.APP_USERNAME, process.env.APP_PASSWORD, stepValue,testInfo);
        }
        if(actionKeyword ==='logout'){
            console.log("This is a logout step.");
            console.log("Attempting logout with username: " + process.env.APP_USERNAME);
            await landingPage.logout();
        }
        if(actionKeyword==='addtocart'){
           console.log("This is an add to cart step.");
           this.itemname = params[0];
           console.log("This is an add to cart step.",this.itemname);
           await landingPage.selectItem(this.itemname);
        }
        if(actionKeyword==='viewcart'){
            console.log("This is a view cart step.",this.itemname);
            await landingPage.clickViewCart();
            const items:string[] = [this.itemname];
            await cartPage.checkCart(items)
        }
    }


    async login(){
            console.log("This is a login step.");         
            console.log("Attempting login with username: " + process.env.APP_USERNAME);
            await this.loginPage.Login(process.env.APP_USERNAME, process.env.APP_PASSWORD);
        } */

    async stepExecute(stepValue: string, page: any, testInfo: any) {
        const loginPage = new LoginPage(page);
        const landingPage = new LandingPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        const actionPart = stepValue.split('_');
        const actionKeyword = actionPart[0].toLowerCase();
        let params: string[] = actionPart.slice(1);

        // Step s
        this.steps = {
            login: async () => {
                console.log("This is a login step.");

                       if( params[0].toLowerCase().startsWith('valid')){
                          console.log("Attempting login with username: " + process.env.APP_USERNAME);
                          await loginPage.Login(process.env.APP_USERNAME, process.env.APP_PASSWORD,true);
                       }
                       if(params[0].toLowerCase().startsWith('invalidusername')){
                          console.log('Attempting Login with invalidUsername');
                          await loginPage.Login(RandomDataUtil.getUsername(), process.env.APP_PASSWORD,false);
                       }

            },
            logout: async () => {
                console.log("This is a logout step.");
                console.log("Attempting logout with username: " + process.env.APP_USERNAME);
                await landingPage.logout();
            },
            addtocart: async (params: string[]) => {
                console.log("This is an add to cart step.");
                this.itemname = params;
                console.log("This is an add to cart step.", this.itemname);
                await landingPage.selectItem(this.itemname);
            },
            viewcart: async () => {
                console.log("This is a view cart step.", this.itemname);
                await landingPage.clickViewCart();
                const items: string[] = this.itemname;
                await cartPage.checkCart(items);
            },
            checkout: async (params:string[])=>{
                await cartPage.checkOut();
                if(params.length===0){
                  params = [RandomDataUtil.getFirstName().toString(),RandomDataUtil.getlastName().toString(),RandomDataUtil.getRandomZipcode().toString()]
                  console.log(params);
                }
                await checkoutPage.fillOutForm(params[0],params[1],params[2]);
                await checkoutPage.checkoutOverview();
            }
        }

        console.log("Executing step: " + stepValue);
    

        const actionStep = this.steps[actionKeyword];
        if (!actionStep) {
            throw new Error(`Unsupported step: ${actionKeyword}`);
        }
        await actionStep(params, testInfo);


    }



}


