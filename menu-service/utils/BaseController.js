import Globals from "./Globals.js";

/**
 *
 * @description Base controller for all controllers
 * @class BaseController
 * @module utils/BaseController
 */
export default class BaseController {
    constructor(model) {
        this.model = model;
    }


    /**
     * @description Create a new record
     * @param {*} req
     * @param {*} res
     * @returns response
     */
    create = async (req, res) => {
        try {
            return this.response({
               message: 'Test creation'
            }, null, res);
        } catch (error) {
            this.response(null, error, res);
        }
    };

    /**
     * @description get all records
     * @param {*} req
     * @param {*} res
     * @returns response
     */
   find = async (req, res) => {
      try {
         const data = await this.model.findAll();
         return this.response({
            data,
            count: data.length,
         }, null, res);
      } catch (error) {
         this.response(null, error, res);
      }
   };


    /**
     * @description Get a single record based on filters (not by ID)
     * @param {*} req
     * @param {*} res
     * @returns response
     */
    findOne = async (req, res) => {
        try {
            return this.response({
               message: 'Success'
            }, null, res);
        } catch (error) {
            this.response(null, error, res);
        }
    };


    /**
     * @description get record by id
     * @param {*} req
     * @param {*} res
     * @returns response
     */
    findById = async (req, res) => {
        try {
            return this.response({
               message: 'Success'
            }, null, res);
        } catch (error) {
            this.response(null, error, res);
        }
    };

    /**
     * @description update record by id
     */
    findByIdAndUpdate = async (req, res) => {
        try {
            return this.response({
               message: 'Success'
            }, null, res);
        } catch (error) {
            this.response(null, error, res);
        }
    };

    /**
     * @description soft delete by id
     * @param {*} req
     * @param {*} res
     * @returns response
     */
    findByIdAndDelete = async (req, res) => {
        try {
            return this.response({
               message: 'Success'
            }, null, res);
        } catch (error) {
            this.response(null, error, res);
        }
    };

    /**
     * @description hard delete by id
     * @param {*} req
     * @param {*} res
     * @returns response
     */
    destroy = async (req, res) => {
        try {
            return this.response({
               message: 'Success'
            }, null, res);
        } catch (error) {
            this.response(null, error, res);
        }
    };

    /**
     *
     * @description Bulk create records
     * @param {*} req
     * @param {*} res
     * @returns
     */
    bulkCreate = async (req, res) => {
        try {

            const data = req.body;

            if(!Array.isArray(data))
                return this.response(null, { message: "Data must be an array" }, res);

            if(!data.length)
                return this.response(null, { message: "Array cannot be empty" }, res);

            await this.model.insertMany(data);
            return this.response({data}, null, res);
        } catch (error) {
            this.response(null, error, res);
        }
    };

    /**
     *
     * @description Bulk update records
     * @param {*} req
     * @param {*} res
     * @returns
     */
    bulkUpdate = async (req, res) => {
        try {
            return this.response({
               message: 'Success'
            }, null, res);
        } catch (error) {
            this.response(null, error, res);
        }
    };

    /**
     *
     * @description Bulk delete records
     * @param {*} req
     * @param {*} res
     * @returns
     */
    bulkDelete = async (req, res) => {
        try {
            return this.response({
               message: 'Success'
            }, null, res);
        } catch (error) {
            this.response(null, error, res);
        }
    }


    /**
     *
     * @description response function for all
     * @param {*} data
     * @param {*} error
     * @param {*} res
     * @returns response
     */
    response = (data, err, res) => {
        if(err) {
            console.log('err :>> ', err);
            const er = err?.response?.data?.Fault?.Error;
            console.log('###Error: ', er ? er : err);
            return res.send(err);
        } return res.json(data);
    }

    resolveKey(key) {
        return key.endsWith('Id')
            ? key.slice(0, -2)
            : key;
    }


}