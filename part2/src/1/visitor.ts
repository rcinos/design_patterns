import { Circle, Square, Triangle } from "./shapes";

export interface Visitor {
  visitCircle(element: Circle): void;
  visitSquare(element: Square): void;
  visitTriangle(element: Triangle): void;
}

export class AreaVisitor implements Visitor {
  visitCircle(element: Circle): void {
    console.log(Math.random() * 100, element.constructor.name, "Circle Area");
  }

  visitSquare(element: Square): void {
    console.log(Math.random() * 100, element.constructor.name, "Square Area");
  }

  visitTriangle(element: Triangle): void {
    console.log(Math.random() * 100, element.constructor.name, "Triangle Area");
  }
}

export class PerimeterVisitor implements Visitor {
  visitCircle(element: Circle): void {
    console.log(
      Math.random() * 10,
      element.constructor.name,
      "Circle Perimeter",
    );
  }

  visitSquare(element: Square): void {
    console.log(
      Math.random() * 10,
      element.constructor.name,
      "Square Perimeter",
    );
  }

  visitTriangle(element: Triangle): void {
    console.log(
      Math.random() * 10,
      element.constructor.name,
      "Triangle Perimeter",
    );
  }
}
