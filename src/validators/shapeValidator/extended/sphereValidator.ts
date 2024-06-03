import { ShapeValidator } from "../shapeValidator";

export class SphereValidator extends ShapeValidator {
  areValidCoords(listOfCoords: number[]): boolean {
    let radius = listOfCoords[listOfCoords.length - 1] as number;

    return radius > 0;
  }
}
