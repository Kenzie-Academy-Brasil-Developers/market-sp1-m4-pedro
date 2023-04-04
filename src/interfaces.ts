export interface IProduct {
  id: number;
  name: string;
  price: number;
  weight: number;
  section: "food" | "cleaning";
  expirationDate: Date;
}

export interface IFoodProduct extends IProduct {
  calories: number;
}

export interface ICleaningProduct extends IProduct {}

export type IProductRequest = Omit<IProduct, "id" | "expirationDate">;

export type IFoodProductRequest = Omit<IFoodProduct, "id" | "expirationDate">;
