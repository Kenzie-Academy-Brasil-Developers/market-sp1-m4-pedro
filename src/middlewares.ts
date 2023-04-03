import { NextFunction, Request, Response } from "express";
import { market } from "./database";

export const ensureProductExists = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const id = parseInt(request.params.id);

  const findIndex = market.findIndex((product) => product.id === id);

  if (findIndex === -1) {
    return response.status(404).json({
      error: "Product not found",
    });
  }

  response.locals.product = {
    idProduct: id,
    indexProduct: findIndex,
  };

  return next();
};
