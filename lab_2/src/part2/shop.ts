import { createProducts } from "./createProducts";
import {
  CreationSortingStrategy,
  ExpirationSortingStrategy,
  NameSortingStrategy,
  Strategy,
} from "./strategy/strategy";

export interface Product {
  getCreationDate(): Date;
  getExpirationDate(): Date;
  getName(): string;
}

class Shop {
  private strategy: Strategy;
  protected products: Product[] = [];

  addProduct(product: Product) {
    this.products.push(product);
  }

  setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  sort(products: Product[]): Product[] {
    if (!this.strategy) {
      throw new Error("Strategy is not set");
    }
    return this.strategy.sort(products);
  }
}

const shop = new Shop();

const products = createProducts();

const nameStrategy = new NameSortingStrategy();

const expirationStrategy = new ExpirationSortingStrategy();

const creationStrategy = new CreationSortingStrategy();

products.forEach((product) => shop.addProduct(product));

shop.setStrategy(nameStrategy);
console.log(shop.sort(products));

shop.setStrategy(expirationStrategy);
console.log(shop.sort(products));

shop.setStrategy(creationStrategy);
console.log(shop.sort(products));
