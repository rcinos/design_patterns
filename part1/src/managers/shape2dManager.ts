import { ShapeManager } from "./shapeManager";
import { Shape2d } from "../entities/oval";

export abstract class Shape2dManager extends ShapeManager {
  abstract calculatePerimeter(shape: Shape2d): number;
}
