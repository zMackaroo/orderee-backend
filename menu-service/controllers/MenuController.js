import BaseController from "../utils/BaseController.js";
import db from "../models/index.js";

export default class MenuController extends BaseController {
    constructor(){
        super(db.Menu)
    }
}
