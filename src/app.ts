import express, { Request, Response } from "express";
import cors from "cors";
import { AuthRouters } from "./app/modules/auth/auth.route";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { BlogRouters } from "./app/modules/blog/blog.router";
const app = express();

// perser -------------->
app.use(express.json());
app.use(cors());

// application routes---------------->
app.use("/api/auth", AuthRouters);
app.use("/api/admin", AuthRouters);
app.use("/api", BlogRouters);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello From Blog Project.");
});

// Global error handle-------->
app.use(globalErrorHandler);

export default app;
