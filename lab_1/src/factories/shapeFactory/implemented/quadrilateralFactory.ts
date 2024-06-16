import { Quadrilateral } from "../../../entities/shape/extended/quadrilateral";
import { ShapeFactory } from "../shapeFactory";
import { QuadrilateralValidator } from "../../../validators/shapeValidator/extended/quadrilateralValidator";
import { Point2d } from "../../../entities/point/implemented/point2d";
import { PointFactory } from "../../pointFactory";
import { ListOfCoords } from "../../../validators/types/listOfCoords";
import { PointValidator } from "../../../validators/pointValidator";
import crypto from "crypto";

export class QuadrilateralFactory implements ShapeFactory {
  static idAssigner = crypto.randomBytes(16);
  private validator: QuadrilateralValidator = new QuadrilateralValidator();
  private pointValidator: PointValidator = new PointValidator();
  private pointFactory: PointFactory = new PointFactory();

  createShape(coords: string): Quadrilateral | never {
    const listOfCoords = this.convertCoordsToList(coords);
    this.validateCoords(listOfCoords);
    const points = this.createPoints(listOfCoords);
    return new Quadrilateral(
      QuadrilateralFactory.idAssigner.toString("hex"),
      points,
    );
  }

  private convertCoordsToList(coords: string): ListOfCoords<string> {
    const listOfCoords = coords.split(" ");
    if (!this.validator.isCoordsLengthValid(listOfCoords, 8)) {
      throw new TypeError(
        "Incorrect input data. You need 4 2d points to create a Quadrilateral",
      );
    }
    return listOfCoords.reduce(
      (acc: [string[], string[], string[], string[]], point, currentIndex) => {
        acc[Math.floor(currentIndex / 2)]!.push(point);
        return acc;
      },
      [[], [], [], []],
    ) as ListOfCoords<string>;
  }

  private validateCoords(listOfCoords: ListOfCoords<string>): void {
    for (let i = 0; i < listOfCoords.length; i++) {
      if (
        !this.pointValidator.isValidPoint(listOfCoords[i]![0] as string) ||
        !this.pointValidator.isValidPoint(listOfCoords[i]![1] as string)
      ) {
        throw new TypeError(
          "Incorrect input data. You need 4 2d points to create a Quadrilateral",
        );
      }
    }
  }

  private createPoints(
    listOfCoords: ListOfCoords<string>,
  ): [Point2d, Point2d, Point2d, Point2d] {
    return listOfCoords.map(
      (point: [string, string]): Point2d =>
        this.pointFactory.create2dPoint({
          x: Number(point[0]),
          y: Number(point[1]),
        }),
    ) as [Point2d, Point2d, Point2d, Point2d];
  }
}
