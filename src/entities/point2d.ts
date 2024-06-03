import { Point } from "./point";
import { Point2dCoords } from "../pointCoords";

export class Point2d implements Point {
  coords: Point2dCoords;

  constructor(coords: Point2dCoords) {
    this.coords = coords;
  }
}
