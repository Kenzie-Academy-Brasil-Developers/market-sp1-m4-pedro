import { NextFunction, Request, Response } from "express";
import { market } from "./database";

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

export const checkIfNameAlredyExists = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {};
