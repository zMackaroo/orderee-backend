import BaseController from "../utils/BaseController.js";
import db from "../models/index.js";

export default class ClientController extends BaseController {
    constructor(){
        super(db.Client)
    }
}

