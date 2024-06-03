import { Oval } from "../entities/oval";
import { ShapeFactory } from "./shapeFactory";
import { OvalValidator } from "../validators/ovalValidator";
import { PointFactory } from "../types/pointFactory";
import { PointValidator } from "../validators/pointValidator";
import crypto from "crypto";
import { Point2dFactory } from "./point2dFactory";
import { Point2d } from "../entities/point2d";

export class OvalFactory implements ShapeFactory {
  static idAssigner = crypto.randomBytes(20);
  private validator: OvalValidator = new OvalValidator();
  private pointValidator: PointValidator = new PointValidator();
  private pointFactory: PointFactory = new Point2dFactory();

  createShape(coords: string): Oval | never {
    const listOfCoords = this.convertCoordsToList(coords);
    this.validateCoords(listOfCoords);
    const center = this.createCenter(listOfCoords);
    const radiusX = Number(listOfCoords[listOfCoords.length - 2]);
    const radiusY = Number(listOfCoords[listOfCoords.length - 1]);
    return new Oval(
      OvalFactory.idAssigner.toString("hex"),
      center,
      radiusX,
      radiusY,
    );
  }

  private convertCoordsToList(coords: string): string[] {
    return coords.split(" ");
  }

  private validateCoords(coords: string[]): void | never {
    coords.forEach((coord) => {
      if (!this.pointValidator.isValidPoint(coord)) {
        throw new Error(
          "Invalid coordinates for a Oval. Please provide 1 2d point and 2 radius.",
        );
      }
    });

    if (coords.length < 4) {
      throw new Error(
        "Invalid coordinates for a Oval. Please provide 1 2d point and 2 radius.",
      );
    }

    if (!this.validator.areValidCoords(Number(coords[coords.length - 2]))) {
      throw new Error(
        "Invalid coordinates for a Oval. Please provide 1 2d point and 2 radius.",
      );
    }

    if (!this.validator.areValidCoords(Number(coords[coords.length - 1]))) {
      throw new Error(
        "Invalid coordinates for a Oval. Please provide 1 2d point and 2 radius.",
      );
    }
  }

  private createCenter(coords: string[]): Point2d {
    const newCoords = {
      x: Number(coords[0]),
      y: Number(coords[1]),
    };
    return this.pointFactory.createPoint(newCoords);
  }
}
