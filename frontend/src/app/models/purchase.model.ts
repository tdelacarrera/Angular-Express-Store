import { IUser } from "./user.model";

export interface IPurchase {
  id: number;
  price: number;
  user: IUser;
  products: {
    productId: number;
    name: string;
    quantity: number;
  }[];
}