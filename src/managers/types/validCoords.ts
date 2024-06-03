import { Point3d } from "../../entities/point3d";
import { Point } from "../../entities/point";

export type validCoordsForCone = {
  center: Point3d;
  radius: number;
};

export type validCoords = Point[] | validCoordsForCone;
