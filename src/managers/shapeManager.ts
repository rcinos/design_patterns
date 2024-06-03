import { Shape } from "../entities/shape";

export abstract class ShapeManager {
  abstract calculateArea(shape: Shape): number;
}
