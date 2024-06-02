import { Point3d } from "../../point/implemented/point3d";
import { Shape } from "../shape";
import { SphereValidator } from "../../../validators/shapeValidator/extended/sphereValidator";
import { repository } from "../../../repository";

export class Sphere extends Shape {
  readonly id: number;
  _center: Point3d;
  _radius: number;
  readonly name: string = "Sphere";
  validator = new SphereValidator();

  constructor(id: number, coords: Point3d, radius: number) {
    super();
    this.id = id;
    this.center = coords;
    this.radius = radius;
  }

  get center(): Point3d {
    return this._center;
  }

  private set center(value: Point3d) {
    this._center = value;
  }

  get radius(): number {
    return this._radius;
  }

  private set radius(value: number) {
    this._radius = value;
  }

  changeCoords(coords: [Point3d, number]): void {
    if (this.validator.areValidCoordsWithPoint(coords)) {
      if (repository.findById(this.id)) {
        repository.changedCoords(this.id, coords);
        this.center = coords[0];
        this.radius = coords[1];
      }
    } else {
      throw new Error(
        "Invalid coordinates for a sphere. Please provide 1 3d point and positive radius.",
      );
    }
  }
}
