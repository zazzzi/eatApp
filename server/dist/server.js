"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const PORT = process.env.PORT || 6969;
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Serve the React static files after build
app.use(express_1.default.static("../client/build"));
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
app.get("/api/hello", (req, res) => {
    res.send({ message: "Hello" });
});
// All other unmatched requests will return the React app
app.get("/", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "client", "build", "index.html"));
});
