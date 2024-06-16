import { Point2d } from "../../point/implemented/point2d";
import { Shape } from "../shape";
import { QuadrilateralValidator } from "../../../validators/shapeValidator/extended/quadrilateralValidator";
import { repository } from "../../../repository";
import { observer } from "../../../observers/ShapeObserver";
import { QuadrilateralManager } from "../../../managers/shapeManager/extended/shape2dManager/extended/quadrilateralManager";

export abstract class Shape2d extends Shape {}

export class Quadrilateral extends Shape2d {
  readonly id: string;
  private _coords: [Point2d, Point2d, Point2d, Point2d];
  readonly name: string = "Quadrilateral";
  validator = new QuadrilateralValidator();
  manager: QuadrilateralManager = new QuadrilateralManager();

  constructor(id: string, coords: [Point2d, Point2d, Point2d, Point2d]) {
    super();
    this.id = id;
    this.coords = coords;
  }

  get coords(): [Point2d, Point2d, Point2d, Point2d] {
    return this._coords;
  }

  set coords(value: [Point2d, Point2d, Point2d, Point2d]) {
    if (this.validator.areValidCoordsWithPoints(value)) {
      this._coords = value;
      if (repository.findById(this.id)) {
        observer.notify({
          action: "changed coords",
          subscriber: repository,
          payload: this,
        });
      }
    } else {
      throw new Error(
        "Incorrect input data. You need 4 2d points to create a Quadrilateral",
      );
    }
  }
}
