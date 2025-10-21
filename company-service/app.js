import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path";

import 'dotenv/config';

import InitModules from "./utils/InitModules.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, "templates")));

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(helmet());

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).json({ message: "Company Service is running." });
});

InitModules.init(app);
