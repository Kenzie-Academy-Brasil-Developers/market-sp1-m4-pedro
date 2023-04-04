import { Request, Response } from "express";
import {
  ICleaningProduct,
  IFoodProduct,
  IFoodProductRequest,
  IProduct,
  IProductRequest,
} from "./interfaces";
import { market } from "./database";

// STATUS

const ok = 200;
const created = 201;
const noContent = 204;

// POST

export const createProducts = (
  request: Request,
  response: Response
): Response => {
  const productsData: Array<IProductRequest | IFoodProductRequest> =
    request.body;

  const date = new Date();
  date.setDate(date.getDate() + 365);

  let total = 0;

  const productCreated = productsData.map(
    (product: IProductRequest | IFoodProductRequest) => {
      const newProduct: ICleaningProduct | IFoodProduct = {
        id: market.length + 1,
        ...product,
        expirationDate: date,
      };

      total += product.price;

      market.push(newProduct);

      return newProduct;
    }
  );

  return response
    .status(created)
    .json({ total, marketProducts: productCreated });
};

// GET

export const listAllProducts = (
  request: Request,
  response: Response
): Response => {
  const totalValue = market.reduce(
    (previusValue, currentValue) => previusValue + currentValue.price,
    0
  );
  return response
    .status(ok)
    .json({ total: totalValue, marketProducts: market });
};

export const listEspecificProduct = (
  request: Request,
  response: Response
): Response => {
  const id = parseInt(request.params.id);

  const findIndex = market.findIndex((product) => product.id === id);

  return response.json(market[findIndex]);
};

// PATCH

export const updateProducts = 1;

// DELETE

export const deleteProducts = (
  request: Request,
  response: Response
): Response => {
  const id = parseInt(request.params.id);

  const findIndex = market.findIndex((product) => product.id === id);

  market.splice(findIndex, 1);

  return response.status(noContent).send();
};
