import { ShapeValidator } from "./shapeValidator";

export class ConeValidator extends ShapeValidator {
  areValidCoords(distance: number): boolean {
    return distance > 0;
  }
}
