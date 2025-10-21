import BaseRouter from "../utils/BaseRouter.js";
import CategoryController from "../controllers/CategoryController.js";

export default class CategoryRouter extends BaseRouter {
  constructor() {
    super(new CategoryController(), import.meta.url);
  }
}
