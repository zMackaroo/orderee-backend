import BaseRouter from "../utils/BaseRouter.js";
import ClientController from "../controllers/ClientController.js";

export default class ClientRouter extends BaseRouter {
  constructor() {
    super(new ClientController(), import.meta.url);
  }
}
