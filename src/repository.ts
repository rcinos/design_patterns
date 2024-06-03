import { Shape } from "./entities/shape";
import { observer } from "./observer";
import { warehouse } from "./warehouse";
import { Oval } from "./entities/oval";
import { Comparator } from "./comparator";
import { Point2d } from "./entities/point2d";
import { Point3d } from "./entities/point3d";

export class Repository {
  private shapes = new Set<Shape>();
  private static instance: Repository;

  private constructor() {}

  static getInstance() {
    if (!Repository.instance) {
      Repository.instance = new Repository();
    }
    return Repository.instance;
  }

  add(shape: Shape) {
    if (this.shapes.has(shape)) {
      console.log("Shape already exists in the repository.");
      return;
    }
    observer.subscribe({
      event: "replaced coordinates",
      subscriber: this,
      to: shape,
    });
    observer.notify({
      event: "update",
      subscriber: warehouse,
      to: shape,
      hook: shape,
    });
    this.shapes.add(shape);
  }

  remove(shape: Shape) {
    if (!this.shapes.has(shape)) {
      console.log("Shape does not exist in the repository.");
      return;
    }
    observer.unsubscribe({
      event: "replaced coordinates",
      subscriber: this,
      to: shape,
    });
    observer.notify({
      event: "remove",
      subscriber: warehouse,
      hook: shape,
    });
    for (let s of this.shapes) {
      if (s.id === shape.id) {
        this.shapes.delete(shape);
        return;
      }
    }
  }

  findById(id: string): Shape | undefined {
    return Array.from(this.shapes).find((s) => s.id === id);
  }

  findByCoords(point: Point2d | Point3d): Shape[] {
    const coords = point.coords;
    return Array.from(this.shapes).filter((s) => {
      if (Object.keys(coords).length === 3) {
        return (
          s.center.coords.x === coords.x &&
          s.center.coords.y === coords.y &&
          s.center.coords.z === coords.z
        );
      } else {
        return s.center.coords.x === coords.x && s.center.coords.y === coords.y;
      }
    });
  }

  findByName(name: string): Shape[] {
    return Array.from(this.shapes).filter((s) => s.name === name);
  }

  findByQuadrant(quadrant: number): Shape[] {
    switch (quadrant) {
      case 1:
        return Array.from(this.shapes).filter((s) =>
          s instanceof Oval
            ? s.center.coords.x + s.radiusX > 0 &&
              s.center.coords.x - s.radiusX > 0 &&
              s.center.coords.y + s.radiusY > 0 &&
              s.center.coords.y - s.radiusY > 0
            : [],
        );
      case 2:
        return Array.from(this.shapes).filter((s) =>
          s instanceof Oval
            ? s.center.coords.x - s.radiusX < 0 &&
              s.center.coords.x + s.radiusX > 0 &&
              s.center.coords.y + s.radiusY > 0 &&
              s.center.coords.y - s.radiusY > 0
            : [],
        );
      case 3:
        return Array.from(this.shapes).filter((s) =>
          s instanceof Oval
            ? s.center.coords.x - s.radiusX < 0 &&
              s.center.coords.x + s.radiusX < 0 &&
              s.center.coords.y + s.radiusY < 0 &&
              s.center.coords.y - s.radiusY < 0
            : [],
        );
      case 4:
        return Array.from(this.shapes).filter((s) =>
          s instanceof Oval
            ? s.center.coords.x - s.radiusX > 0 &&
              s.center.coords.x + s.radiusX > 0 &&
              s.center.coords.y + s.radiusY < 0 &&
              s.center.coords.y - s.radiusY < 0
            : [],
        );
      default:
        return [];
    }
  }

  findShapesByPropertyRange(
    property: "perimeter" | "area" | "volume",
    range: [number, number],
  ): Shape[] {
    return Array.from(this.shapes).filter((s) => {
      switch (property) {
        case "perimeter":
          const perimeter = warehouse.getPerimeter(s);
          if (perimeter !== undefined) {
            return perimeter >= range[0] && perimeter <= range[1];
          }
          return false;
        case "area":
          const area = warehouse.getArea(s);
          if (area !== undefined) {
            return area >= range[0] && area <= range[1];
          }
          return false;
        case "volume":
          const volume = warehouse.getVolume(s);
          if (volume !== undefined) {
            return volume >= range[0] && volume <= range[1];
          }
          return false;
        default:
          return false;
      }
    });
  }

  findByDistanceFromOrigin(distance: number): Shape[] {
    return Array.from(this.shapes).filter((s) => {
      if (Object.keys(s.center.coords).length !== 3) {
        const distanceToOrigin = Math.sqrt(
          s.center.coords.x ** 2 + s.center.coords.y ** 2,
        );
        return distanceToOrigin === distance;
      }
      const distanceToOrigin = Math.sqrt(
        s.center.coords.x ** 2 +
          s.center.coords.y ** 2 +
          (s.center.coords.z as number) ** 2,
      );
      return distanceToOrigin === distance;
    });
  }

  sortById(): Shape[] {
    return Array.from(this.shapes).sort((a, b) => a.id.localeCompare(b.id));
  }

  sortByNames(): Shape[] {
    return Array.from(this.shapes).sort((a, b) => a.name.localeCompare(b.name));
  }

  sortByFirstPoint(point: "x" | "y" | "z"): Shape[] {
    return Array.from(this.shapes).sort(Comparator.byFirstPoint(point));
  }

  update(eventType: string, hook: Shape) {
    if (eventType === "replaced coordinates") {
      observer.notify({
        event: "update",
        subscriber: warehouse,
        hook,
      });
    }
  }
}

export const repository = Repository.getInstance();
