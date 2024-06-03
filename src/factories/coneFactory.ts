import { Cone } from "../entities/cone";
import { ShapeFactory } from "./shapeFactory";
import { ConeValidator } from "../validators/coneValidator";
import { PointFactory } from "../types/pointFactory";
import { PointValidator } from "../validators/pointValidator";
import crypto from "crypto";
import { Point3dFactory } from "./point3dFactory";
import { Point3d } from "../entities/point3d";

export class ConeFactory implements ShapeFactory {
  static idAssigner = crypto.randomBytes(20);
  private validator: ConeValidator = new ConeValidator();
  private pointValidator: PointValidator = new PointValidator();
  private pointFactory: PointFactory = new Point3dFactory();

  createShape(coords: string): Cone | never {
    const listOfCoords = this.convertCoordsToList(coords);
    this.validateCoords(listOfCoords);
    const center = this.createCenter(listOfCoords);
    const radius = Number(listOfCoords[listOfCoords.length - 2]);
    const height = Number(listOfCoords[listOfCoords.length - 1]);
    return new Cone(
      ConeFactory.idAssigner.toString("hex"),
      center,
      radius,
      height,
    );
  }

  private convertCoordsToList(coords: string): string[] {
    return coords.split(" ");
  }

  private validateCoords(coords: string[]): void | never {
    coords.forEach((coord) => {
      if (!this.pointValidator.isValidPoint(coord)) {
        throw new Error(
          "Invalid coordinates for a Cone. Please provide 1 3d point and radius and height.",
        );
      }
    });

    if (coords.length < 5) {
      throw new Error(
        "Invalid coordinates for a Cone. Please provide 1 3d point and radius and height.",
      );
    }

    if (this.validator.areValidCoords(Number(coords[coords.length - 2]))) {
      throw new Error(
        "Invalid coordinates for a Cone. Please provide 1 3d point and radius and height.",
      );
    }

    if (!this.validator.areValidCoords(Number(coords[coords.length - 1]))) {
      throw new Error(
        "Invalid coordinates for a Cone. Please provide 1 3d point and radius and height.",
      );
    }
  }

  private createCenter(coords: string[]): Point3d {
    const newCoords = {
      x: Number(coords[0]),
      y: Number(coords[1]),
      z: Number(coords[2]),
    };
    return this.pointFactory.createPoint(newCoords) as Point3d;
  }
}
