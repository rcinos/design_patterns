import { Point } from "../point/point";
import { ShapeManager } from "../../managers/shapeManager/shapeManager";

export abstract class Shape {
  abstract readonly id: string;
  abstract readonly name: string;
  abstract coords?: Point[];
  abstract manager: ShapeManager;
}
