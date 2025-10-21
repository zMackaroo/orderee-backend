import BaseController from "../utils/BaseController.js";
import db from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class AuthController extends BaseController {
    constructor(){
        super(db.Client)
    }


    login = async (req, res) => {
        try {
            const { username, password } = req.body;

            const client = await this.model.scope('withPassword').findOne({ where: { username } });

            if(!client)
               return this.response(null, { message: 'Client not found' }, res);

            const isValid = await bcrypt.compare(password, client.password);
            if(!isValid)
               return this.response(null, { message: 'Invalid password' }, res);

            const token = jwt.sign(
               { userId: client.id },
               process.env.JWT_SECRET,
               { expiresIn: '1d'}
            );

            res.cookie('auth_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000
            });

            const response = await this.model.findByPk(client.id);

            return this.response({
                token,
                data: response
            }, null, res);
        } catch (error) {
            this.response(null, error, res);
        }
    }

    register = async (req, res) => {
        try {
            const { name, description, email, contact_number, address, branch, username, password } = req.body;

            const existingClient = await this.model.scope('withPassword').findOne({
                where: {
                    [db.Sequelize.Op.or]: [
                        { username },
                        { email }
                    ]
                }
            });

            if (existingClient) {
                return this.response(null, { message: 'Username or email already exists' }, res);
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const client = await this.model.scope('withPassword').create({
                name,
                description,
                email,
                contact_number,
                address,
                branch,
                username,
                password: hashedPassword,
                active: true
            });

            const token = jwt.sign(
                { userId: client.id },
                process.env.JWT_SECRET,
                { expiresIn: '1d'}
            );

            return this.response({
                token,
                data: client
            }, null, res);
        } catch (error) {
            this.response(null, error, res);
        }
    }

    logout = async (req, res) => {
        try {
            res.clearCookie('auth_token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            });

            return this.response({ message: 'Logged out successfully' }, null, res);
        } catch (error) {
            this.response(null, error, res);
        }
    }

    me = async (req, res) => {
        try {
            return this.response({ data: req.user }, null, res);
        } catch (error) {
            this.response(null, error, res);
        }
    }
}

