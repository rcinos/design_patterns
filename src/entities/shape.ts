import { Point } from "./point";
import { ShapeManager } from "../managers/shapeManager";

export abstract class Shape {
  abstract readonly id: string;
  abstract readonly name: string;
  abstract center: Point;
  abstract radius?: number;
  abstract manager: ShapeManager;
}
