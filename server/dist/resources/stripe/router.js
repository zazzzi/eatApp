"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const accountRouter = express_1.default.Router();
const cors = require('cors');
const controller = require("./controller");
accountRouter
    .post("/payment", cors(), controller.stripePayment);
exports.default = accountRouter;
