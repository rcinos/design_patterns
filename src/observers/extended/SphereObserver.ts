import { ShapeObserver } from "../ShapeObserver";
import { TSphereObserver } from "../types/TShapeObserver";
import { SphereWarehouse } from "../../warehouses/extended/sphereWarehouse";
import { Sphere } from "../../entities/shape/extended/sphere";

export class SphereObserver implements ShapeObserver {
  private listeners: TSphereObserver = {};
  private static instance: SphereObserver;

  warehouse: SphereWarehouse;

  private constructor(warehouse: SphereWarehouse) {
    this.warehouse = warehouse;
  }

  static getInstance(warehouse: SphereWarehouse) {
    if (!SphereObserver.instance) {
      SphereObserver.instance = new SphereObserver(warehouse);
    }
    return SphereObserver.instance;
  }

  subscribe(eventType: keyof TSphereObserver, shape: Sphere): void {
    this.listeners[eventType] = this.listeners[eventType] || [];
    this.listeners[eventType]!.push(shape);
  }

  unsubscribe(eventType: keyof TSphereObserver, shape: Sphere): void {
    this.listeners[eventType] = this.listeners[eventType]?.filter(
      (l) => l !== shape,
    );
  }

  notify(eventType: keyof TSphereObserver, shape: Sphere): void {
    this.listeners[eventType]
      ?.filter((l) => l === shape)
      .forEach((_l) => this.warehouse.update(eventType, shape));
  }
}
