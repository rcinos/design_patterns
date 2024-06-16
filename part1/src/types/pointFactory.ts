import { Point } from "../entities/point";
import { PointCoords } from "../pointCoords";

export abstract class PointFactory {
  abstract createPoint(coords: PointCoords): Point;
}
