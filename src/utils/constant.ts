import path from 'path';
import * as comFunc from './commonFunctions';

export const testDataBasePath = comFunc.checkfilepath(path.join(process.cwd(), 'src/testdata'));

