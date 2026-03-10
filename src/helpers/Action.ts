import { expect } from "@playwright/test";
import  path from "path";
import * as fs from 'fs';

export class Action {


     async inputAction(element: any, value: any) {
          await expect(element).toBeVisible();
          await expect(element).toBeEnabled();
          try{
          await element.fill(value);
          }catch{
               await element.focus();
               await element.type(value);
          }
     }

     async clickAction(element: any) {
          await expect(element).toBeVisible();
          await expect(element).toBeEnabled();
          await element.click();
     }

     async actiontakeScreenshot(page: any, name: string, testInfo: any, description: any) {
          const folder = path.join(process.cwd(), "test-results", 'screenshots');
          if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

          const filePath = path.join(folder, `${name}.png`);
          const buffer = await page.screenshot({ path: filePath, fullPage: true });

          // Attach to HTML report
          await testInfo.attach(name, {
               body: buffer,
               contentType: 'image/png',
               description: description
          });
     }



}