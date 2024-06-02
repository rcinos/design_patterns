import { Shape } from "../entities/shape/shape";

export interface ShapeWarehouse {
  update(eventType: string, shape: Shape): void;
}
