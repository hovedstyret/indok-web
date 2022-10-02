import { Organization } from "./organizations";
import { User } from "./users";

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  organization: Organization;
  maxBuyableQuantity: number;
};

export type PaymentStatus = "INITIATED" | "RESERVED" | "CAPTURED" | "CANCELLED" | "REFUNDED" | "FAILED" | "REJECTED";

export type Order = {
  id: string;
  product: Product;
  user: User;
  quantity: number;
  totalPrice: number;
  paymentStatus: PaymentStatus;
  timestamp: string;
};
