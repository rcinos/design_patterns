import { FoodBuilder } from "./builder";
import { Product } from "../shop";

export class SandwichBuilder implements FoodBuilder {
  private sandwich: Sandwich;

  constructor() {
    this.reset();
  }

  reset() {
    this.sandwich = new Sandwich();
  }

  addCucumber() {
    this.sandwich.compound.push("cucumber");
  }

  addTomato() {
    this.sandwich.compound.push("tomato");
  }

  addMeat() {
    this.sandwich.compound.push("meat");
  }

  addCheese() {
    this.sandwich.compound.push("cheese");
  }

  addMayonnaise() {
    this.sandwich.compound.push("mayonnaise");
  }

  addKetchup() {
    this.sandwich.compound.push("ketchup");
  }

  addOnion() {
    this.sandwich.compound.push("onion");
  }

  addLettuce() {
    this.sandwich.compound.push("lettuce");
  }

  addOil() {
    this.sandwich.compound.push("oil");
  }

  addVinegar() {
    this.sandwich.compound.push("vinegar");
  }

  addGarlic(): void {
    this.sandwich.compound.push("garlic");
  }

  addMustard(): void {
    this.sandwich.compound.push("garlic");
  }

  addSalmon(): void {
    this.sandwich.compound.push("garlic");
  }

  addTuna(): void {
    this.sandwich.compound.push("garlic");
  }

  addBread(): void {
    this.sandwich.compound.push("bread");
  }

  getSandwich() {
    const sandwich = this.sandwich;
    this.reset();
    return sandwich;
  }
}

export class Sandwich implements Product {
  compound: string[] = [];

  getCompound() {
    return this.compound;
  }

  getCreationDate(): Date {
    return new Date();
  }

  getExpirationDate(): Date {
    const date = new Date();
    date.setDate(date.getDate() + 6);
    return date;
  }

  getName(): string {
    return "sandwich";
  }
}
