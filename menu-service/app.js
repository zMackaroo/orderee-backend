import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path";

import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, "templates")));

app.use(cors());
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).json({ message: "Menu Service is running." });
});

app.listen(process.env.PORT || 5002, () => {
    console.log(`Menu Service is running on port ${process.env.PORT || 4000}`);
});
