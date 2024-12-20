"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_route_1 = require("./app/modules/auth/auth.route");
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const blog_router_1 = require("./app/modules/blog/blog.router");
const app = (0, express_1.default)();
// perser -------------->
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// application routes---------------->
app.use("/api/auth", auth_route_1.AuthRouters);
app.use("/api/admin", auth_route_1.AuthRouters);
app.use("/api", blog_router_1.BlogRouters);
app.use("/api/admin", blog_router_1.BlogRouters);
app.get("/", (req, res) => {
    res.send("Hello From Blog Project.");
});
// Global error handle-------->
app.use(globalErrorHandler_1.default);
exports.default = app;
