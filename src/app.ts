import express, { Application } from "express";
import {
  createProducts,
  deleteProducts,
  listAllProducts,
  listEspecificProduct,
  updateProducts,
} from "./logic";
import { checkIfNameAlreadyExists, ensureProductExists } from "./middlewares";

const app: Application = express();
app.use(express.json());

app.post("/products", checkIfNameAlreadyExists, createProducts);
app.get("/products", listAllProducts);
app.get("/products/:id", ensureProductExists, listEspecificProduct);
app.patch(
  "/products/:id",
  ensureProductExists,
  checkIfNameAlreadyExists,
  updateProducts
);
app.delete("/products/:id", ensureProductExists, deleteProducts);

const PORT: number = 3000;
const runningMessage: string = `Server running on http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMessage));
