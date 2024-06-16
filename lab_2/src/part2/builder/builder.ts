export interface FoodBuilder {
  addCucumber(): void;
  addTomato(): void;
  addMeat(): void;
  addCheese(): void;
  addMayonnaise(): void;
  addKetchup(): void;
  addOnion(): void;
  addLettuce(): void;
  addOil(): void;
  addVinegar(): void;
  addGarlic(): void;
  addTuna(): void;
  addSalmon(): void;
  addMustard(): void;
  addBread(): void;
}

export class FoodDirector {
  private foodBuilder: FoodBuilder;

  setBuilder(builder: FoodBuilder) {
    this.foodBuilder = builder;
  }

  createSolnyshkoSalad() {
    if (!this.foodBuilder) {
      throw new Error("Food builder is not set");
    }
    this.foodBuilder.addMayonnaise();
    this.foodBuilder.addCheese();
    this.foodBuilder.addOnion();
    this.foodBuilder.addMustard();
    this.foodBuilder.addGarlic();
  }

  createTuchkaSalad() {
    if (!this.foodBuilder) {
      throw new Error("Food builder is not set");
    }
    this.foodBuilder.addOil();
    this.foodBuilder.addVinegar();
    this.foodBuilder.addTuna();
    this.foodBuilder.addMustard();
    this.foodBuilder.addGarlic();
  }

  createStudencheskiySandwich() {
    if (!this.foodBuilder) {
      throw new Error("Food builder is not set");
    }
    this.foodBuilder.addCheese();
    this.foodBuilder.addBread();
    this.foodBuilder.addMayonnaise();
  }
}
