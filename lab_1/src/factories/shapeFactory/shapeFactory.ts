import { Shape } from "../../entities/shape/shape";

export interface ShapeFactory {
  createShape: (coords: string) => Shape | never;
}
