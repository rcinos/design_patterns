import { Point3d } from "../../entities/point/implemented/point3d";
import { Point } from "../../entities/point/point";

export type validCoordsForSphere = {
  center: Point3d;
  radius: number;
};

export type validCoords = Point[] | validCoordsForSphere;