import Globals from "./Globals.js";
import { Op } from "sequelize";

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
     *
     * @description Build nested includes
     * @param {*} model
     * @param {*} depth
     * @param {*} visited
     * @returns
     */
    getNestedIncludes(model, depth = 2, visited = new Set()) {
        if(depth <= 0 || !model.associations) return [];
        if(visited.has(model.name)) return [];

        visited.add(model.name);
        const result = [];

        for(const key of Object.keys(model.associations)) {
            const target = model.associations[key].target;
            const item = { association: key, required: false };

            const nested = this.getNestedIncludes(target, depth - 1, new Set(visited));
            if(nested.length > 0) item.include = nested;

            result.push(item);
        }

        return result;
    }

    parseIncludes(includesStr, depth = 2) {
        if(!includesStr || !this.model.associations) return [];

        const names = includesStr.split(',').map(n => n.trim());
        const includeMap = {};

        for(const name of names) {
            const parts = name.split('.');
            const rootName = parts[0];

            if(!this.model.associations[rootName]) continue;

            if(!includeMap[rootName]) {
                includeMap[rootName] = {
                    association: rootName,
                    required: false,
                    nested: []
                };
            }

            if(parts.length > 1) {
                const nestedPath = parts.slice(1).join('.');
                includeMap[rootName].nested.push(nestedPath);
            }
        }

        const result = [];
        for(const key in includeMap) {
            const item = includeMap[key];
            const assoc = this.model.associations[key];

            const includeObj = {
                association: key,
                required: false
            };

            if(item.nested.length > 0) {
                const nestedStr = item.nested.join(',');
                const nestedModel = assoc.target;

                const tempController = Object.create(this);
                tempController.model = nestedModel;
                includeObj.include = tempController.parseIncludes(nestedStr, depth - 1);
            }

            result.push(includeObj);
        }

        return result;
    }

    getQueryOptions(req) {
        const {
            includes,
            limit = 10,
            offset = 0,
            sort,
            sortBy = 'createdAt',
            date_range,
            exclude,
            depth = 2,
            paginate = 'true'
        } = req.query;

        const opts = { where: {} };

        if(paginate !== 'false' && paginate !== '0') {
            opts.limit = parseInt(limit) || 10;
            opts.offset = parseInt(offset) || 0;
        }

        if(includes && includes !== 'false' && includes !== '0') {
            opts.include = this.parseIncludes(includes, parseInt(depth));
        }

        if(sort) {
            const order = sort.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
            opts.order = [[sortBy, order]];
        }

        if(date_range) {
            const [from, to] = date_range.split(':');
            if(from && to) {
                opts.where.createdAt = {
                    [Op.between]: [new Date(from), new Date(to)]
                };
            }
        }

        if(exclude) {
            const items = exclude.split(',');
            for(const item of items) {
                const [field, val] = item.split(':');
                if(field && val) opts.where[field] = { [Op.ne]: val };
            }
        }

        return opts;
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
         const opts = this.getQueryOptions(req);
         const data = await this.model.findAll(opts);

         const response = { data, count: data.length };

         if(opts.limit !== undefined) {
            const total = await this.model.count({ where: opts.where || {} });
            response.total = total;
            response.limit = opts.limit;
            response.offset = opts.offset;
         }

         return this.response(response, null, res);
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
            const opts = this.getQueryOptions(req);
            const data = await this.model.findOne(opts);

            if(!data) {
               return this.response(null, { message: 'Record not found' }, res);
            }

            return this.response({ data }, null, res);
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
            const { id } = req.params;
            const opts = this.getQueryOptions(req);
            opts.where = { ...opts.where, id };

            const data = await this.model.findOne(opts);

            if(!data) {
               return this.response(null, { message: 'Record not found' }, res);
            }

            return this.response({ data }, null, res);
        } catch (error) {
            this.response(null, error, res);
        }
    };

    /**
     * @description update record by id
     * @param {*} req
     * @param {*} res
     * @returns response
     */
    findByIdAndUpdate = async (req, res) => {
        try {
            return this.response({ message: 'Success' }, null, res);
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
            return this.response({ message: 'Success' }, null, res);
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
            return this.response({ message: 'Success' }, null, res);
        } catch (error) {
            this.response(null, error, res);
        }
    };

    /**
     * @description Bulk create records
     * @param {*} req
     * @param {*} res
     * @returns response
     */
    bulkCreate = async (req, res) => {
        try {
            const data = req.body;
            if(!Array.isArray(data)) return this.response(null, { message: "Data must be an array" }, res);
            if(!data.length) return this.response(null, { message: "Array cannot be empty" }, res);

            await this.model.insertMany(data);
            return this.response({data}, null, res);
        } catch (error) {
            this.response(null, error, res);
        }
    };

    /**
     * @description Bulk update records
     * @param {*} req
     * @param {*} res
     * @returns response
     */
    bulkUpdate = async (req, res) => {
        try {
            return this.response({ message: 'Success' }, null, res);
        } catch (error) {
            this.response(null, error, res);
        }
    };

    /**
     * @description Bulk delete records
     * @param {*} req
     * @param {*} res
     * @returns response
     */
    bulkDelete = async (req, res) => {
        try {
            return this.response({ message: 'Success' }, null, res);
        } catch (error) {
            this.response(null, error, res);
        }
    }

    /**
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
        }
        return res.json(data);
    }

    resolveKey(key) {
        return key.endsWith('Id') ? key.slice(0, -2) : key;
    }


}