import BaseRouter from "../utils/BaseRouter.js";
import AuthController from "../controllers/AuthController.js";

export default class AuthRouter extends BaseRouter {
  constructor() {
    super(new AuthController(), import.meta.url);
  }

  additionalRoutes() {
    return [
      {
        path: '/login',
        method: 'post',
        handler: 'login'
      },
      {
        path: '/register',
        method: 'post',
        handler: 'register'
      },
      {
        path: '/logout',
        method: 'post',
        handler: 'logout'
      },
      {
        path: '/me',
        method: 'get',
        handler: 'me'
      }
    ];
  }
}
