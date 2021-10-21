"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 4001;
const users = [
    { name: 'Paul' }
];
app.get('/users', (request, response) => {
    console.log("TEST");
    response.send('Hello Everybody!');
});
app.listen(port, () => console.log(`Running on port ${port}`));
