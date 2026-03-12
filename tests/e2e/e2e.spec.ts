/*
Author: Albert Ryan Lamar
Project: 
*/

import {Page, test} from '@playwright/test';
import {tcLoader} from '../../src/utils/commonFunctions';
import { browserSetUp } from '../../src/components/browserSetUp';
import { TestExecute } from '../../src/helpers/TestExecute';

let rowstart = 4;
let rowend = 6;
let tcData:any;
let page: Page;

test.beforeAll(async({browser})=>{
    console.log('Before all tests');

}) 
test.afterAll(async()=>{
    await page.close();
})
test.describe('E2E Test Suite',()=>{
        tcData = tcLoader('SampleTestData.xlsx','API',rowstart,rowend);
for (const tc of tcData) {
    const getTc= tc;
    test(`${getTc.TestCaseName}`,async({browser},testInfo)=>{
        const newContext = await browserSetUp(browser,true);
        page = await newContext.newPage();

        const step1 = getTc['Step_1']?.trim() ?? '';
        if (!step1 || step1.length === 0) {
          console.error('Step_1 is empty or not defined');
        }
        
        const testExecute = new TestExecute();
        
        for(let i=1;i<16;i++){
            const step = `Step_${i}`;
            const rawValue = await getTc[step];
            const stepValue = (rawValue ?? '').toString().trim();
            
            if(!stepValue || stepValue.length === 0){
               console.log('End of steps reached!');
               break;
            }
            else{
              console.log(`Executing step ${i}: ${stepValue}`);
              await test.step(`Step ${i}: ${stepValue}`, async (testInfo) => {
                 
                 await testExecute.stepExecute(stepValue, page, testInfo);
              });
            }

        }
    })
}

});