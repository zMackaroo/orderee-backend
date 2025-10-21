import BaseRouter from "../utils/BaseRouter.js";
import MenuController from "../controllers/MenuController.js";

export default class MenuRouter extends BaseRouter {
  constructor() {
    super(new MenuController(), import.meta.url);
  }
}
