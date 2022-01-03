"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv").config();
const bodyParser = require("body-parser");
const app = (0, express_1.default)();
const router_1 = __importDefault(require("./resources/stripe/router"));
const PORT = process.env.PORT || 6969;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express_1.default.json());
app.use("/api", router_1.default);
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
