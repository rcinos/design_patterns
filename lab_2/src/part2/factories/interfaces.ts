import { Product } from "../shop";

export interface FoodFactory {
  createChicken(): Chicken;
  createFish(): Fish;
  createBeef(): Beef;
}

export interface Chicken extends Product {
  getExpirationDate(): Date;
}

export interface Fish extends Product {
  getExpirationDate(): Date;
}

export interface Beef extends Product {
  getExpirationDate(): Date;
}
