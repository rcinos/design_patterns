import { Visitor } from "./visitor";

export interface Shape {
  calculateArea(): number;
  calculatePerimeter(): number;
  accept(visitor: Visitor): void;
  showForTV(): void;
  showForMobile(): void;
  showForPrinter(): void;
  showForSmartWatch(): void;
}

export class Circle implements Shape {
  calculateArea(): number {
    return Math.random() * 100;
  }

  calculatePerimeter(): number {
    return Math.random() * 100;
  }

  showForTV(): void {
    console.log("Circle for TV");
  }
  showForMobile(): void {
    console.log("Circle for Mobile");
  }
  showForPrinter(): void {
    console.log("Circle for Printer");
  }
  showForSmartWatch(): void {
    console.log("Circle for SmartWatch");
  }

  accept(visitor: Visitor): void {
    visitor.visitCircle(this);
  }
}

export class Square implements Shape {
  calculateArea(): number {
    return Math.random() * 100;
  }

  calculatePerimeter(): number {
    return Math.random() * 100;
  }

  showForTV(): void {
    console.log("Square for TV");
  }
  showForMobile(): void {
    console.log("Square for Mobile");
  }
  showForPrinter(): void {
    console.log("Square for Printer");
  }
  showForSmartWatch(): void {
    console.log("Square for SmartWatch");
  }

  accept(visitor: Visitor): void {
    visitor.visitSquare(this);
  }
}

export class Triangle implements Shape {
  calculateArea(): number {
    return Math.random() * 100;
  }

  calculatePerimeter(): number {
    return Math.random() * 100;
  }

  showForTV(): void {
    console.log("Triangle for TV");
  }
  showForMobile(): void {
    console.log("Triangle for Mobile");
  }
  showForPrinter(): void {
    console.log("Triangle for Printer");
  }
  showForSmartWatch(): void {
    console.log("Triangle for SmartWatch");
  }

  accept(visitor: Visitor): void {
    visitor.visitTriangle(this);
  }
}
