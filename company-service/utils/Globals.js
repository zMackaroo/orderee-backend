import jwt from 'jsonwebtoken';
import { PUBLIC_API } from '../constants/index.js';

/**
 *
 * @description Methods for global reusable functions
 */
export default class Globals {

    /**
     *
     * @description Middleware to protect routes from unauthorized access
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns token: string
     */
    static async routerMiddleware(req, res, next) {
        const err = { message: 'Unauthorized' };

        // Try to get token from cookie first, fallback to Authorization header
        let token = req.cookies?.auth_token;

        if(!token) {
            const authHeader = req.headers.authorization;
            if(authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.split(' ')[1];
            }
        }

        if(!token) {
            return res.status(401).json(err);
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if(!decoded || !decoded.userId) {
                return res.status(401).json(err);
            }

            // Store user ID in request for use in controllers
            req.userId = decoded.userId;
            req.user = { id: decoded.userId };

            next();
        } catch (error) {
            console.error('middleware error :>> ', error);
            res.status(401).json(err);
        }
    }

    static async userMiddleware(req, res, next) {
        if(!req.user) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    }

    /**
     *
     * @description To register routes dynamically (temporary solution: to implement class based using base router)
     * @param {*} routes
     */
    static registerRoutes(routes, router, rootPath, controller) {
        routes.forEach(route => {
            const endpoint = `/api/${rootPath}${route.path === '/' ? '' : route.path}`;

            const mw =
                Array.isArray(route.middleware)
                    ? route.middleware : [];

            const middlewares = [
                !PUBLIC_API.includes(endpoint) ? this.routerMiddleware : [],
                ...mw,
            ].flat();

            router[route.method](
                route.path,
                ...middlewares,
                controller
                    ? new controller()[route.function]
                    : (req, res) => res.status(401).json({ message: 'Unauthorized' })
            );
        });
    }

    /**
     *
     * @description Deep copy information
     * @param {*} object
     * @returns
     */
    static deepCopy(object) {
        return JSON.parse(JSON.stringify(object));
    }

    /**
     *
     * @description Get error message
     * @param {*} message
     * @returns
     */
    static getError(message) {
        return `Your account is ${message}. Please contact administrator.`;
    }

    /**
     *
     * @description dymically deep dive objects using string
     * @param {*} object
     * @returns
     */
    static deepDive(obj, path) {
        const keys = path.split('.');
        let result = obj;
        for(const key of keys) {
            result = result[key];
            if([undefined, null, ''].includes(result)) {
                return undefined;
            }
        }
        return result;
    }

    /**
     *
     * @description Format Pascal Case
     * @param {*} object
     * @returns
     */
    static formatPascal(str) {
        return str.replace(/([A-Z])/g, ' $1').trim();
    }

    /**
     *
     * @description Format Name
     * @param {*} obj
     * @returns
     */
    static formatName(obj) {
        return `${obj.firstName} ${obj.lastName}`;
    }

}
