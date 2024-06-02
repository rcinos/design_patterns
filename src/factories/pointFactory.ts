import { Point2dCoords, Point3dCoords } from "../entities/types/pointCoords";
import { Point2d } from "../entities/point/implemented/point2d";
import { Point3d } from "../entities/point/implemented/point3d";
import { PointValidator } from "../validators/pointValidator";

export class PointFactory {
  pointValidator = new PointValidator();
  create2dPoint(coords: Point2dCoords): Point2d {
    return new Point2d(coords);
  }
  create3dPoint(coords: Point3dCoords): Point3d {
    return new Point3d(coords);
  }
}
