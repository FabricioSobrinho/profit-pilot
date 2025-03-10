import express from "express";
import { router } from "./routes/routes";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "https://milho-pay.onrender.com/*",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, 
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(
    `Servidor operando 🚀!\nEndereço do servidor: http://localhost:${port}`
  )
);
