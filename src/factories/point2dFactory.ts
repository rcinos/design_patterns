import { PointFactory } from "../types/pointFactory";
import { Point2dCoords } from "../pointCoords";
import { Point2d } from "../entities/point2d";

export class Point2dFactory extends PointFactory {
  createPoint(coords: Point2dCoords): Point2d {
    return new Point2d(coords);
  }
}
