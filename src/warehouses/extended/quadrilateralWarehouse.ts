import { ShapeWarehouse } from "../shapeWarehouse";
import { Quadrilateral } from "../../entities/shape/extended/quadrilateral";
import { QuadrilateralManager } from "../../managers/shapeManager/extended/shape2dManager/extended/quadrilateralManager";

export class QuadrilateralWarehouse implements ShapeWarehouse {
  private manager: QuadrilateralManager = new QuadrilateralManager();
  private perimeters: Map<Quadrilateral, number> = new Map();
  private areas: Map<Quadrilateral, number> = new Map();
  private static instance: QuadrilateralWarehouse;

  private constructor() {}

  static getInstance() {
    if (!QuadrilateralWarehouse.instance) {
      QuadrilateralWarehouse.instance = new QuadrilateralWarehouse();
    }
    return QuadrilateralWarehouse.instance;
  }

  updatePerimeter(shape: Quadrilateral, perimeter: number): void {
    this.perimeters.set(shape, perimeter);
  }

  getPerimeter(shape: Quadrilateral): number | undefined {
    return this.perimeters.get(shape);
  }

  updateArea(shape: Quadrilateral, area: number): void {
    this.areas.set(shape, area);
  }

  getArea(shape: Quadrilateral): number | undefined {
    return this.areas.get(shape);
  }

  update(eventType: string, shape: Quadrilateral): void {
    switch (eventType) {
      case "calculate perimeter":
        this.updatePerimeter(
          shape as Quadrilateral,
          this.manager.calculatePerimeter(shape),
        );
        break;
      case "calculate area":
        this.updateArea(
          shape as Quadrilateral,
          this.manager.calculateArea(shape),
        );
        break;
    }
  }
}
