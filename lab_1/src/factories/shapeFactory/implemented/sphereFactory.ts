import { Sphere } from "../../../entities/shape/extended/sphere";
import { ShapeFactory } from "../shapeFactory";
import { SphereValidator } from "../../../validators/shapeValidator/extended/sphereValidator";
import { PointFactory } from "../../pointFactory";
import { Point3d } from "../../../entities/point/implemented/point3d";
import crypto from "crypto";

export class SphereFactory implements ShapeFactory {
  static idAssigner = crypto.randomBytes(16);
  private validator: SphereValidator = new SphereValidator();
  private pointFactory: PointFactory = new PointFactory();

  createShape(coords: string): Sphere | never {
    const listOfCoords = this.convertCoordsToList(coords);
    this.validateCoords(listOfCoords);
    const center = this.createCenter(listOfCoords);
    const radius = this.createRadius(listOfCoords);
    return new Sphere(SphereFactory.idAssigner.toString("hex"), center, radius);
  }

  private convertCoordsToList(
    coords: string,
  ): [number, number, number, number] | never {
    const listOfCoords = coords.split(" ");
    if (!this.validator.isCoordsLengthValid(listOfCoords, 4)) {
      throw new TypeError(
        "Incorrect input data. You need 1 3d point and positive radius to create a sphere",
      );
    }
    return listOfCoords.map(Number) as [number, number, number, number];
  }

  private validateCoords(listOfCoords: [number, number, number, number]): void {
    if (!this.validator.areValidCoords(listOfCoords)) {
      throw new TypeError(
        "Incorrect input data. You need 1 3d point and positive radius to create a sphere",
      );
    }
  }

  private createCenter(
    listOfCoords: [number, number, number, number],
  ): Point3d {
    const [x, y, z] = listOfCoords;
    return this.pointFactory.create3dPoint({ x, y, z });
  }

  private createRadius(listOfCoords: [number, number, number, number]): number {
    return listOfCoords[3];
  }
}
