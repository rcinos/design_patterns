import { Point } from "./point";
import { Point3dCoords } from "../pointCoords";

export class Point3d implements Point {
  coords: Point3dCoords;

  constructor(coords: Point3dCoords) {
    this.coords = coords;
  }
}
