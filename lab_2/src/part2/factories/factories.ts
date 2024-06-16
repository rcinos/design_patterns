import {
  CookedBeef,
  CookedChicken,
  CookedFish,
} from "./products/cookedProducts";
import { RawBeef, RawChicken, RawFish } from "./products/rawProducts";
import { FoodFactory } from "./interfaces";

export class RawFoodFactory implements FoodFactory {
  createChicken() {
    return new RawChicken();
  }
  createFish() {
    return new RawFish();
  }
  createBeef() {
    return new RawBeef();
  }
}

export class CookedFoodFactory implements FoodFactory {
  createChicken() {
    return new CookedChicken();
  }
  createFish() {
    return new CookedFish();
  }
  createBeef() {
    return new CookedBeef();
  }
}
