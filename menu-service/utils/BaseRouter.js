import { Router } from "express";
import Globals from "../utils/Globals.js";
import { PUBLIC_API } from "../constants/index.js";
import { fileURLToPath } from "url";
import { basename, parse } from "path";
import chalk from "chalk";

export default class BaseRouter {
  constructor(controller, url) {
    this.router = Router();
    this.controller = controller;

    if(!url) console.log(chalk.red(`#\n#\n#\nError: Expected import.meta.url in route.\n#\n#\n#`));
    else {
      const filePath = fileURLToPath(url);
      const fileName = parse(filePath).name;
      const routeName = fileName.toLowerCase();
      this.routePath = routeName.startsWith("index") ? "" : `/${routeName}`;

      this.registerAdditionalRoutes();
      this.initializeDefaultRoutes();
    }
  }

  registerAdditionalRoutes() {
    const additional = typeof this.additionalRoutes === "function"
      ? this.additionalRoutes()
      : [];

    for(const route of additional) {

      if (typeof this.controller[route.handler] !== 'function') {
        console.warn(`Handler "${route.handler}" not found in ${this.routePath}`);
        continue;
      }
      const fullPath = `/api${this.routePath}${route.path}`.replace(/\/{2,}/g, "/");
      const isProtected = !PUBLIC_API.includes(fullPath);

      const stack = isProtected
        ? [Globals.routerMiddleware, this.controller[route.handler]]
        : [this.controller[route.handler]];

      this.router[route.method](route.path, ...stack);
    }
   }

  initializeDefaultRoutes() {
    const { router, controller } = this;

    const mw = (path, handler) => {
      const fullPath = `/api${this.routePath}${path}`.replace(/\/{2,}/g, "/");
      const isProtected = !PUBLIC_API.includes(fullPath);
      return isProtected ? [Globals.routerMiddleware, handler] : [handler];
    };

    router.post("/", ...mw("/", controller.create));
    router.get("/", ...mw("/", controller.find));
    router.get("/find-one", ...mw("/", controller.findOne));
    router.get("/:id", ...mw("/:id", controller.findById));
    router.put("/:id", ...mw("/:id", controller.findByIdAndUpdate));
    router.delete("/:id", ...mw("/:id", controller.findByIdAndDelete));
    router.post("/bulk", ...mw("/bulk", controller.bulkCreate));
    router.put("/bulk", ...mw("/bulk", controller.bulkUpdate));
    router.delete("/bulk", ...mw("/bulk", controller.bulkDelete));
    router.delete("/bulk", ...mw("/bulk", controller.destroy));

  }

  getRouter() {
    return this.router;
  }
}