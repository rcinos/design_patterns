import { createProducts } from "./createProducts";
import {
  CreationSortingStrategy,
  ExpirationSortingStrategy,
  NameSortingStrategy,
} from "./strategy/strategy";

export interface Product {
  getCreationDate(): Date;
  getExpirationDate(): Date;
  getName(): string;
}

const products = createProducts();

const nameStrategy = new NameSortingStrategy();

const expirationStrategy = new ExpirationSortingStrategy();

const creationStrategy = new CreationSortingStrategy();

console.log("sort by name");
console.log(nameStrategy.sort(products).map((product) => product.getName()));

console.log("sort by expiration date");
console.log(
  expirationStrategy.sort(products).map((product) => product.getName()),
);

console.log("sort by creation date");
console.log(
  creationStrategy.sort(products).map((product) => product.getName()),
);
