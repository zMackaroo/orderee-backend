import chalk from 'chalk';

import { readdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

import db from "../models/index.js";

const PORT = process.env.PORT || 5003;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class InitModules {


   /**
    *
    * @description Initialize all the modules
    * @param {*} server: express server
    * @returns void
    */
   static async init(server) {
      try {
         const routesPath = join(__dirname, "../routes");
         const routeFiles = await readdir(routesPath);

         for(const file of routeFiles) {
               if(!file.endsWith(".js")) continue;
               const filePath = join(routesPath, file);
               const { default: route } = await import(`file://${filePath}`);
               const instance = new route();
               const routeName = file.replace(".js", "");
               server.use(`/api/${routeName}`, instance.getRouter());
               console.log(chalk.cyan(`Available endpoint: /api/${routeName}`));
         }

         if(!routeFiles.length)
            throw new Error("No available endpoints. Please create in the routes folder.");

         server.listen(PORT, () => {
            console.log(chalk.cyan(`Menu Service is running on port ${PORT}`));
         });

         await this.connect();
      } catch (error) {
         console.error(chalk.red("Error initializing modules:", error));
         throw error;
      }
   }

   /**
    *
    * @description Connect to the database
    * @returns void
    * @returns authenticated: boolean
    */
   static async connect() {
      try {
         await db.sequelize.authenticate();
         console.log(chalk.green(`Successfully connected to ${process.env.DB_NAME}`));
      } catch (error) {
         console.error(chalk.red("Unable to connect to the database:", error));
         throw error;
      }
   }

}