import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';
import * as cons from './constant';

export function tcLoader(file:string,sheetName:string,rowStart:number, rowEnd:number){
     let readFile:any;
     let tcFile = path.join(cons.testDataBasePath,'tcData',file);
     let finalPath = checkfilepath(tcFile);

     const workbook = XLSX.readFile(finalPath);
     const worksheet = workbook.Sheets[sheetName];
     const headersRangeStr = 'A1:Z1'; // Adjust as needed

     const headersResult = XLSX.utils.sheet_to_json(worksheet, { range: headersRangeStr, header: 1 });
               const headers: string[] = headersResult ? (headersResult[0] as string[]) : [];

               const testCases = [];

               for (let rowNum = rowStart; rowNum <= rowEnd; rowNum++) {
                    const dataRangeStr = `${XLSX.utils.encode_cell({ r: rowNum - 1, c: 0 })}:${XLSX.utils.encode_cell({ r: rowNum - 1, c: headers.length - 1 })}`;

                    const rowResult = XLSX.utils.sheet_to_json(worksheet, { range: dataRangeStr, header: 1 });
                    const rowValues: any[] = rowResult ? (rowResult[0] as any[]) : [];

                    const rowObject: any = {};

                    headers.forEach((header, index) => {
                         rowObject[header] = rowValues[index] !== undefined ? rowValues[index] : null;
                    });

                    testCases.push(rowObject);
               }

                return readFile = testCases;    
}

export function checkfilepath(path:any){
    if(!fs.existsSync(path)){
        throw new Error(`Test Path does not exist: ${path}`);
    }
    return path;
}