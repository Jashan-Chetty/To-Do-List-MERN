import express from "express";
import { connect } from "./db/db.js";
import indexRouter from "./models/index.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

connect();

// use routes
app.use("/", indexRouter);

// start server
app.listen(port, () => {
  console.log(`🚀 Server started on http://localhost:3000`);
});
