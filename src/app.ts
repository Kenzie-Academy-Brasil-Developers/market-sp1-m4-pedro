import express, { Application } from "express";
import {
  createProducts,
  listAllProducts,
  listCleaningProducts,
  listFoodProducts,
} from "./logic";
import { ensureProductExists } from "./middlewares";

const app: Application = express();
app.use(express.json());

app.post("/products", createProducts);
app.get("/products", listAllProducts);
app.get(
  "/products/:id",
  ensureProductExists,
  listFoodProducts,
  listCleaningProducts
);
app.patch("/products/:id");
app.delete("/products/:id", ensureProductExists);

const PORT: number = 3000;
const runningMsg: string = `Server running on http://localhost:${PORT}`;
app.listen(PORT, () => console.log(runningMsg));
