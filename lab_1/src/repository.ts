import { Shape } from "./entities/shape/shape";
import { observer } from "./observers/ShapeObserver";
import { warehouse } from "./shapeWarehouse";
import { Point } from "./entities/point/point";
import { Shape2d } from "./entities/shape/extended/quadrilateral";
import { Sphere } from "./entities/shape/extended/sphere";
import { Comparator } from "./comparator";

export class Repository {
  private static instance: Repository;
  private shapes = new Set<Shape>();

  private constructor() {}

  static getInstance() {
    if (!Repository.instance) {
      Repository.instance = new Repository();
    }
    return Repository.instance;
  }

  reset() {
    this.shapes.clear();
  }

  add(shape: Shape) {
    if (this.shapes.has(shape)) {
      console.log("Shape already exists in the repository.");
      return;
    }
    observer.subscribe({
      action: "changed coords",
      subscriber: this,
    });
    observer.notify({
      action: "update all",
      subscriber: warehouse,
      payload: shape,
    });
    this.shapes.add(shape);
  }

  remove(shape: Shape) {
    if (!this.shapes.has(shape)) {
      console.log("Shape does not exist in the repository.");
      return;
    }
    observer.unsubscribe({
      action: "changed coords",
      subscriber: this,
    });
    observer.notify({
      action: "remove all",
      subscriber: warehouse,
      payload: shape,
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

  findByCoords(coords: Point[]): Shape[] {
    return Array.from(this.shapes).filter((s) => {
      if (s.coords && s.coords.length === coords.length) {
        return s.coords.every(
          (c, i) =>
            c.coords.x === coords[i]!.coords.x &&
            c.coords.y === coords[i]!.coords.y,
        );
      } else if (
        s instanceof Sphere &&
        s.center.coords.length === coords.length
      ) {
        return (
          s.center.coords.x === coords[0]!.coords.x &&
          s.center.coords.y === coords[0]!.coords.y &&
          s.center.coords.z === coords[0]!.coords.z
        );
      }
      return false;
    });
  }

  findByName(name: string): Shape[] {
    return Array.from(this.shapes).filter((s) => s.name === name);
  }

  findByQuadrant(quadrant: number): Shape[] {
    switch (quadrant) {
      case 1:
        return Array.from(this.shapes).filter((s) =>
          s instanceof Shape2d && s.coords
            ? s.coords.every((c) => c.coords.x > 0 && c.coords.y > 0)
            : [],
        );
      case 2:
        return Array.from(this.shapes).filter((s) =>
          s instanceof Shape2d && s.coords
            ? s.coords.every((c) => c.coords.x < 0 && c.coords.y > 0)
            : [],
        );
      case 3:
        return Array.from(this.shapes).filter((s) =>
          s instanceof Shape2d && s.coords
            ? s.coords.every((c) => c.coords.x < 0 && c.coords.y < 0)
            : [],
        );
      case 4:
        return Array.from(this.shapes).filter((s) =>
          s instanceof Shape2d && s.coords
            ? s.coords.every((c) => c.coords.x > 0 && c.coords.y < 0)
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
      const coords = s.coords;
      if (coords) {
        const closestPoint = coords.reduce((acc, c) => {
          const distanceToOrigin = Math.sqrt(c.coords.x ** 2 + c.coords.y ** 2);
          return distanceToOrigin < acc ? distanceToOrigin : acc;
        }, Infinity);
        return closestPoint === distance;
      } else if (s instanceof Sphere) {
        const distanceToOrigin = Math.sqrt(
          s.center.coords.x ** 2 +
            s.center.coords.y ** 2 +
            s.center.coords.z ** 2,
        );
        return distanceToOrigin === distance;
      }
      return false;
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

  update(eventType: string, payload: Shape) {
    switch (eventType) {
      case "changed coords":
        console.log(`Shape with id ${payload.id} has changed its coordinates.`);
        observer.notify({
          action: "update all",
          subscriber: warehouse,
          payload,
        });
        break;
      default:
        console.log(`Unknown event type: ${eventType}`);
    }
  }
}

export const repository = Repository.getInstance();
