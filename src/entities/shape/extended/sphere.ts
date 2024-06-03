import { Point3d } from "../../point/implemented/point3d";
import { Shape } from "../shape";
import { SphereValidator } from "../../../validators/shapeValidator/extended/sphereValidator";
import { repository } from "../../../repository";
import { observer } from "../../../observers/ShapeObserver";
import { Point } from "src/entities/point/point";
import { SphereManager } from "../../../managers/shapeManager/extended/shape3dManager/extended/sphereManager";

export abstract class Shape3d extends Shape {}

export class Sphere extends Shape3d {
  coords?: Point[] | undefined;
  readonly id: string;
  private _center: Point3d;
  private _radius: number;
  readonly name: string = "Sphere";
  validator = new SphereValidator();
  manager: SphereManager = new SphereManager();

  constructor(id: string, coords: Point3d, radius: number) {
    super();
    this.id = id;
    this.center = coords;
    this.radius = radius;
  }

  get center(): Point3d {
    return this._center;
  }

  private set center(value: Point3d) {
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
    if (this.validator.areValidCoords([value])) {
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
        "Invalid coordinates for a sphere. Please provide 1 3d point and positive radius.",
      );
    }
  }
}
