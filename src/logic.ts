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

  const productCreated = productsData.map(
    (product: IProductRequest | IFoodProductRequest) => {
      const newProduct: ICleaningProduct | IFoodProduct = {
        id: market.length + 1,
        ...product,
        expirationDate: date,
      };

      market.push(newProduct);

      return newProduct;
    }
  );

  const totalValue = market.reduce(
    (previusValue, currentValue) => previusValue + currentValue.price,
    0
  );

  return response
    .status(created)
    .json({ total: totalValue, marketProducts: productCreated });
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
  const index = response.locals.product.indexProduct;

  return response.json(market[index]);
};

// PATCH

export const updateProducts = (
  request: Request,
  response: Response
): Response => {
  const index = response.locals.product.indexProduct;
  const updatedData = request.body;

  market[index] = {
    ...market[index],
    ...updatedData,
  };

  return response.json(market[index]);
};

// DELETE

export const deleteProducts = (
  request: Request,
  response: Response
): Response => {
  const index = response.locals.product.indexProduct;

  market.splice(index, 1);

  return response.status(noContent).send();
};
