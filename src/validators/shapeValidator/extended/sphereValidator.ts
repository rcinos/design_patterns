import { ShapeValidator } from "../shapeValidator";
import { Point3d } from "../../../entities/point/implemented/point3d";

export class SphereValidator extends ShapeValidator {
  areValidCoords(listOfCoords: number[]): boolean {
    let radius = listOfCoords[3] as number;

    return radius > 0;
  }

  areValidCoordsWithPoint(listOfCoords: [Point3d, number]): boolean {
    let radius = listOfCoords[1];
    return radius > 0;
  }
}
