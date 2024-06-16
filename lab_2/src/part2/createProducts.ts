import { CookedFoodFactory, RawFoodFactory } from "./factories/factories";
import { Product } from "./shop";
import { SaladBuilder } from "./builder/saladBuilder";
import { SandwichBuilder } from "./builder/sandwichBuilder";
import { FoodDirector } from "./builder/builder";
const rawFoodFactory = new RawFoodFactory();

const cookedFoodFactory = new CookedFoodFactory();

const saladBuilder = new SaladBuilder();
const sandwichBuilder = new SandwichBuilder();
const foodDirector = new FoodDirector();

export function createProducts() {
  let products: Product[] = [];

  products = products.concat(
    Array(10)
      .fill(1)
      .map((_) => rawFoodFactory.createBeef()),
  );
  products = products.concat(
    Array(10)
      .fill(1)
      .map((_) => rawFoodFactory.createFish()),
  );

  products = products.concat(
    Array(10)
      .fill(1)
      .map((_) => rawFoodFactory.createChicken()),
  );

  products = products.concat(
    Array(10)
      .fill(1)
      .map((_) => cookedFoodFactory.createFish()),
  );

  products = products.concat(
    Array(10)
      .fill(1)
      .map((_) => cookedFoodFactory.createChicken()),
  );

  products = products.concat(
    Array(10)
      .fill(1)
      .map((_) => cookedFoodFactory.createBeef()),
  );

  foodDirector.setBuilder(saladBuilder);

  foodDirector.createSolnyshkoSalad();

  const solnyshkoSalad = saladBuilder.getSalad();

  foodDirector.createTuchkaSalad();

  const tuchkaSalad = saladBuilder.getSalad();

  foodDirector.setBuilder(sandwichBuilder);

  foodDirector.createStudencheskiySandwich();

  const sandwich = sandwichBuilder.getSandwich();

  products.push(solnyshkoSalad, tuchkaSalad, sandwich);

  return products;
}
