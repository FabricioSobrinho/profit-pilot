import express from "express";
import { router } from "./routes/routes";

const app = express();

app.use(express.json());
app.use(router)

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`Server runing 🚀!\nServer adress: http://localhost:${port}`)
);