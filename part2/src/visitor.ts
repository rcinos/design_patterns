import { Circle, Square, Triangle } from "./shapes";

export interface Visitor {
  visitCircle(element: Circle): void;
  visitSquare(element: Square): void;
  visitTriangle(element: Triangle): void;
}

export class AreaVisitor implements Visitor {
  visitCircle(element: Circle): void {
    console.log(element.calculateArea(), "Circle Area");
  }

  visitSquare(element: Square): void {
    console.log(element.calculateArea(), "Square Area");
  }

  visitTriangle(element: Triangle): void {
    console.log(element.calculateArea(), "Triangle Area");
  }
}

export class PerimeterVisitor implements Visitor {
  visitCircle(element: Circle): void {
    console.log(element.calculatePerimeter(), "Circle Perimeter");
  }

  visitSquare(element: Square): void {
    console.log(element.calculatePerimeter(), "Square Perimeter");
  }

  visitTriangle(element: Triangle): void {
    console.log(element.calculatePerimeter(), "Triangle Perimeter");
  }
}
