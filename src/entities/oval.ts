import { Point2d } from "./point2d";
import { Shape } from "./shape";
import { OvalValidator } from "../validators/ovalValidator";
import { repository } from "../repository";
import { observer } from "../observers/ShapeObserver";
import { OvalManager } from "../managers/ovalManager";

export abstract class Shape2d extends Shape {}

export class Oval extends Shape2d {
  readonly id: string;
  private _center: Point2d;
  private _radiusX: number;
  private _radiusY: number;
  readonly name: string = "Oval";
  validator = new OvalValidator();
  manager: OvalManager = new OvalManager();

  constructor(id: string, center: Point2d, radiusX: number, radiusY: number) {
    super();
    this.id = id;
    this.center = center;
    this.radiusX = radiusX;
    this.radiusY = radiusY;
  }

  get center() {
    return this._center;
  }

  set center(value: Point2d) {
    this._center = value;
    if (repository.findById(this.id)) {
      observer.notify({
        action: "changed coords",
        subscriber: repository,
        payload: this,
      });
    } else {
      throw new Error(
        "Incorrect input data. You need 4 2d points to create a Oval",
      );
    }
  }

  get radiusX() {
    return this._radiusX;
  }

  set radiusX(value: number) {
    if (this.validator.areValidCoords(value)) {
      this._radiusX = value;
      if (repository.findById(this.id)) {
        observer.notify({
          action: "changed coords",
          subscriber: repository,
          payload: this,
        });
      } else {
        throw new Error(
          "Incorrect input data. You need 4 2d points to create a Oval",
        );
      }
    }
  }

  get radiusY() {
    return this._radiusY;
  }

  set radiusY(value: number) {
    if (this.validator.areValidCoords(value)) {
      this._radiusY = value;
      if (repository.findById(this.id)) {
        observer.notify({
          action: "changed coords",
          subscriber: repository,
          payload: this,
        });
      } else {
        throw new Error(
          "Incorrect input data. You need 4 2d points to create a Oval",
        );
      }
    }
  }

  radius: number;
}
