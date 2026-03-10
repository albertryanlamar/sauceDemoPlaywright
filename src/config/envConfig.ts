import dotenv from 'dotenv';
import path from 'path';
import * as fs from 'fs';


const NODE_ENV = process.env.NODE_ENV || 'uat'

const envFile = path.join(__dirname,`.env.${NODE_ENV}`);

if (!fs.existsSync(envFile)) {
  throw new Error(`Environment file does not exist: ${envFile}`);
}
console.log(`Loading environment variables from: ${envFile}`);

dotenv.config({path: envFile});

