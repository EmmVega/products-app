import { User } from "@/core/auth/interface/user";

export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";
export type Gender = "men" | "women" | "unisex" | "kid";

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: Size[];
  gender: Gender;
  tags: string[];
  images: string[];
  user: User;
}