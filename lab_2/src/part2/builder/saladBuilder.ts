import { FoodBuilder } from "./builder";
import { Product } from "../shop";

export class SaladBuilder implements FoodBuilder {
  private salad: Salad;

  constructor() {
    this.reset();
  }

  reset() {
    this.salad = new Salad();
  }

  addCucumber() {
    this.salad.compound.push("cucumber");
  }

  addTomato() {
    this.salad.compound.push("tomato");
  }

  addMeat() {
    this.salad.compound.push("meat");
  }

  addCheese() {
    this.salad.compound.push("cheese");
  }

  addMayonnaise() {
    this.salad.compound.push("mayonnaise");
  }

  addKetchup() {
    this.salad.compound.push("ketchup");
  }

  addOnion() {
    this.salad.compound.push("onion");
  }

  addLettuce() {
    this.salad.compound.push("lettuce");
  }

  addOil() {
    this.salad.compound.push("oil");
  }

  addVinegar() {
    this.salad.compound.push("vinegar");
  }

  addGarlic(): void {
    this.salad.compound.push("garlic");
  }

  addMustard(): void {
    this.salad.compound.push("mustard");
  }

  addSalmon(): void {
    this.salad.compound.push("garlic");
  }

  addTuna(): void {
    this.salad.compound.push("garlic");
  }

  addBread(): void {
    this.salad.compound.push("bread");
  }

  getSalad() {
    const salad = this.salad;
    this.reset();
    return salad;
  }
}

export class Salad implements Product {
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
    return "salad";
  }
}
