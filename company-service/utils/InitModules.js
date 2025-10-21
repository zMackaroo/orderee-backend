import db from "../models/index.js";
import chalk from 'chalk';

export default class InitModules {

   static async init(server) {
      try {
         await this.connectDB();

         server.listen(process.env.PORT, () => {
            console.log(chalk.cyan(`Company Service is running on port ${process.env.PORT}`));
         });
      } catch (error) {
         throw error;
      }
   }



   static async connectDB() {
      try {
         await db.sequelize.authenticate();
         console.log(chalk.green(`Successfully connected to ${process.env.DB_NAME}`));
      } catch (error) {
         console.error(chalk.red("Unable to connect to the database:", error));
         throw error;
      }
   }

}