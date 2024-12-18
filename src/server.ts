import mongoose from "mongoose";
import app from "./app";

require("dotenv").config();

async function main() {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);

    app.listen(process.env.PORT, () => {
      console.log(`Blog Project listening on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}

main();
