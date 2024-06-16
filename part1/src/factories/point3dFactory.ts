import { Point3dCoords } from "../pointCoords";
import { Point3d } from "../entities/point3d";
import { PointFactory } from "../types/pointFactory";

export class Point3dFactory extends PointFactory {
  createPoint(coords: Point3dCoords): Point3d {
    return new Point3d(coords);
  }
}
