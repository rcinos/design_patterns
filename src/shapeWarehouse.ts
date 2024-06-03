import { Shape } from "./entities/shape/shape";
import { Shape2d } from "./entities/shape/extended/quadrilateral";
import { Shape3d } from "./entities/shape/extended/sphere";
import { Shape3dManager } from "./managers/shapeManager/extended/shape3dManager/shape3dManager";
import { Shape2dManager } from "./managers/shapeManager/extended/shape2dManager/shape2dManager";
import { observer } from "./observers/ShapeObserver";

export interface ShapeWarehouse {
  update(eventType: string, shape: Shape): void;
}

class Warehouse implements ShapeWarehouse {
  private static instance: Warehouse;
  private areas: Map<Shape, number> = new Map();
  private perimeters: Map<Shape2d, number> = new Map();
  private volumes: Map<Shape3d, number> = new Map();

  private constructor() {
    observer.subscribe({
      action: "update all",
      subscriber: this,
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
    if (eventType === "update all") {
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
    } else if (eventType === "remove all") {
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
