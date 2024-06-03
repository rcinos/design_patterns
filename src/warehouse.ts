import { Shape } from "./entities/shape";
import { Shape2d } from "./entities/oval";
import { Shape3d } from "./entities/cone";
import { Shape3dManager } from "./managers/shape3dManager";
import { Shape2dManager } from "./managers/shape2dManager";
import { observer } from "./observer";
import { repository } from "./repository";

export interface TWarehouse {
  update(eventType: string, shape: Shape): void;
}

class Warehouse implements TWarehouse {
  private static instance: Warehouse;
  private areas: Map<Shape, number> = new Map();
  private perimeters: Map<Shape2d, number> = new Map();
  private volumes: Map<Shape3d, number> = new Map();

  private constructor() {
    observer.subscribe({
      event: "update",
      subscriber: this,
      to: repository,
    });
  }

  static getInstance() {
    if (!Warehouse.instance) {
      Warehouse.instance = new Warehouse();
    }
    return Warehouse.instance;
  }

  private updatePerimeter(shape: Shape2d, perimeter: number): void {
    this.perimeters.set(shape, perimeter);
  }

  getPerimeter(shape: Shape2d): number | undefined {
    return this.perimeters.get(shape);
  }

  private updateArea(shape: Shape, area: number): void {
    this.areas.set(shape, area);
  }

  getArea(shape: Shape): number | undefined {
    return this.areas.get(shape);
  }

  private updateVolume(shape: Shape3d, volume: number): void {
    this.volumes.set(shape, volume);
  }

  getVolume(shape: Shape3d): number | undefined {
    return this.volumes.get(shape);
  }

  update(eventType: string, shape: Shape): void {
    const shapeManager = shape.manager;
    if (eventType === "update") {
      if (shape instanceof Shape2d) {
        this.updatePerimeter(
          shape,
          (shapeManager as Shape2dManager).calculatePerimeter(shape),
        );
      } else if (shape instanceof Shape3d) {
        this.updateVolume(
          shape,
          (shapeManager as Shape3dManager).calculateVolume(shape),
        );
      }
      this.updateArea(shape, shapeManager.calculateArea(shape));
    } else if (eventType === "remove") {
      if (shape instanceof Shape2d) {
        this.perimeters.delete(shape);
      } else if (shape instanceof Shape3d) {
        this.volumes.delete(shape);
      }
      this.areas.delete(shape);
    }
  }
}

export const warehouse = Warehouse.getInstance();
