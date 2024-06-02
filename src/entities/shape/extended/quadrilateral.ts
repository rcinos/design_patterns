import { Point2d } from "../../point/implemented/point2d";
import { Shape } from "../shape";
import { QuadrilateralValidator } from "../../../validators/shapeValidator/extended/quadrilateralValidator";
import { repository } from "../../../repository";

export class Quadrilateral extends Shape {
  readonly id: number;
  _coords: [Point2d, Point2d, Point2d, Point2d];
  readonly name: string = "Quadrilateral";
  validator = new QuadrilateralValidator();

  constructor(id: number, coords: [Point2d, Point2d, Point2d, Point2d]) {
    super();
    this.id = id;
    this.coords = coords;
  }

  get coords(): [Point2d, Point2d, Point2d, Point2d] {
    return this._coords;
  }

  private set coords(value: [Point2d, Point2d, Point2d, Point2d]) {
    this._coords = value;
  }

  changeCoords(coords: [Point2d, Point2d, Point2d, Point2d]): void {
    if (this.validator.areValidCoordsWithPoints(coords)) {
      if (repository.findById(this.id)) {
        repository.changedCoords(this.id, coords);
        this.coords = coords;
      }
    } else {
      throw new Error(
        "Invalid coordinates for a quadrilateral. Please provide 4 points.",
      );
    }
  }
}
