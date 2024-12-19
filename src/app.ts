import express, { Request, Response } from "express";
import cors from "cors";
import { AuthRouters } from "./app/modules/auth/auth.route";
const app = express();

// perser -------------->
app.use(express.json());
app.use(cors());

// application routes---------------->
app.use("/api/auth", AuthRouters);


app.get("/", (req: Request, res: Response) => {
  res.send("Hello From Blog Project.");
});

export default app;
