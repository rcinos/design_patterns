import { ShapeWarehouse } from "../shapeWarehouse";
import { SphereManager } from "../../managers/shapeManager/extended/shape3dManager/extended/sphereManager";
import { Sphere } from "../../entities/shape/extended/sphere";

export class SphereWarehouse implements ShapeWarehouse {
  manager: SphereManager = new SphereManager();
  private areas: Map<Sphere, number> = new Map();
  private volumes: Map<Sphere, number> = new Map();
  private static instance: SphereWarehouse;

  private constructor() {}

  static getInstance() {
    if (!SphereWarehouse.instance) {
      SphereWarehouse.instance = new SphereWarehouse();
    }
    return SphereWarehouse.instance;
  }

  updateVolume(shape: Sphere, volume: number): void {
    this.volumes.set(shape, volume);
  }

  getVolume(shape: Sphere): number | undefined {
    return this.volumes.get(shape);
  }

  updateArea(shape: Sphere, area: number): void {
    this.areas.set(shape, area);
  }

  getArea(shape: Sphere): number | undefined {
    return this.areas.get(shape);
  }

  update(eventType: string, shape: Sphere): void {
    switch (eventType) {
      case "calculate volume":
        this.updateVolume(shape, this.manager.calculateVolume(shape));
        break;
      case "calculate area":
        this.updateArea(shape, this.manager.calculateArea(shape));
    }
  }
}
