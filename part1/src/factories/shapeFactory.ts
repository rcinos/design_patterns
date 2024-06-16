import { Shape } from "../entities/shape";

export interface ShapeFactory {
  createShape: (coords: string) => Shape | never;
}
