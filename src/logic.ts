import { Request, Response } from "express";
import {
  IProduct,
  IFoodProduct,
  ICleaningProduct,
  IProductRequest,
} from "./interfaces";
import { market } from "./database";

// POST

export const createProducts = (
  request: Request,
  response: Response
): Response => {
  const productsData: IProductRequest = request.body;

  const newProduct: IProduct = {
    id: market.length + 1,
    ...productsData,
    expirationDate: new Date(),
  };

  market.push(newProduct);

  return response.status(201).json(newProduct);
};

// GET

export const listAllProducts = (
  request: Request,
  response: Response
): Response => {
  return response.status(200).json(market);
};

export const listFoodProducts = (
  request: Request,
  response: Response
): Response => {
  const id = parseInt(request.params.id);

  const findIndex = market.findIndex((foodProcut) => foodProcut.id === id);

  return response.status(200).json(market[findIndex]);
};

export const listCleaningProducts = (
  request: Request,
  response: Response
): Response => {
  const id = parseInt(request.params.id);

  const findIndex = market.findIndex(
    (cleaningProcut) => cleaningProcut.id === id
  );

  return response.status(200).json(market[findIndex]);
};
