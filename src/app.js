import express from "express";
import connect_db from "./config/dbConnect.js";
import routes from "./routes/index.js";

const conexao = await connect_db();

conexao.on("error", (err) => {
  console.error(err);
});

conexao.once("open", () => {
  console.log("conexão realizada com sucesso");
});

const app = express();
routes(app);

export default app;
