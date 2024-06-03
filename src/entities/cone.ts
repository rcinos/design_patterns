import { Point3d } from "./point3d";
import { Shape } from "./shape";
import { ConeValidator } from "../validators/coneValidator";
import { repository } from "../repository";
import { observer } from "../observers/ShapeObserver";
import { Point } from "src/entities/point";
import { ConeManager } from "../managers/coneManager";

export abstract class Shape3d extends Shape {}

export class Cone extends Shape3d {
  coords?: Point[] | undefined;
  readonly id: string;
  private _center: Point3d;
  private _radius: number;
  private _height: number;
  readonly name: string = "Cone";
  validator = new ConeValidator();
  manager: ConeManager = new ConeManager();

  constructor(id: string, coords: Point3d, radius: number, height: number) {
    super();
    this.id = id;
    this.center = coords;
    this.radius = radius;
    this.height = height;
  }

  get center(): Point3d {
    return this._center;
  }

  get height(): number {
    return this._height;
  }

  set height(value: number) {
    if (this.validator.areValidCoords(value)) {
      this._height = value;
      if (repository.findById(this.id)) {
        observer.notify({
          action: "changedCoords",
          subscriber: repository,
          payload: this,
        });
      }
    } else {
      throw new Error(
        "Invalid coordinates for a Cone. Please provide 1 3d point and radius and height.",
      );
    }
  }

  set center(value: Point3d) {
    observer.notify({
      action: "changed coords",
      subscriber: repository,
      payload: this,
    });
    this._center = value;
  }

  get radius(): number {
    return this._radius;
  }

  set radius(value: number) {
    if (this.validator.areValidCoords(value)) {
      this._radius = value;
      if (repository.findById(this.id)) {
        observer.notify({
          action: "changedCoords",
          subscriber: repository,
          payload: this,
        });
      }
    } else {
      throw new Error(
        "Invalid coordinates for a Cone. Please provide 1 3d point and radius and height.",
      );
    }
  }
}
