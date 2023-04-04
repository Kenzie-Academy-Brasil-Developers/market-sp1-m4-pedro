import { NextFunction, Request, Response } from "express";
import { market } from "./database";
import { IProductRequest, IFoodProductRequest } from "./interfaces";

// STATUS

const notFound = 404;
const conflict = 409;

export const ensureProductExists = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const id = parseInt(request.params.id);

  const findIndex = market.findIndex((product) => product.id === id);

  if (findIndex === -1) {
    return response.status(notFound).json({
      error: "Product not found",
    });
  }

  response.locals.product = {
    idProduct: id,
    indexProduct: findIndex,
  };

  return next();
};

export const checkIfNameAlreadyExists = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const productsData: Array<IProductRequest | IFoodProductRequest> =
    request.body;

  let marketNames = false;

  productsData.forEach((newProduct) => {
    marketNames = market.some((products) => products.name === newProduct.name);
  });

  if (marketNames) {
    return response.status(conflict).json({
      error: "Product already exists!",
    });
  }
  return next();
};
