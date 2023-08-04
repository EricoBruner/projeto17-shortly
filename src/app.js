import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";

import router from "./routes/index.routes.js";

const app = express();

app.use(json());
app.use(cors());

dotenv.config();

app.use(router);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`👾 Server running on port ${port} 👾`);
});
