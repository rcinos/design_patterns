import { ShapeValidator } from "./shapeValidator";

export class OvalValidator extends ShapeValidator {
  areValidCoords(radius: number): boolean {
    return radius > 0;
  }
}
