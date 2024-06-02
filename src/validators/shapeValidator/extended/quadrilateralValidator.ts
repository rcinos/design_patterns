import { ShapeValidator } from "../shapeValidator";
import { getApproximateValue } from "../../../functions/getApproximateValue";
import { ListOfCoords } from "../../types/listOfCoords";
import { Point2d } from "../../../entities/point/implemented/point2d";

const DUPLICATE_SLOPE_COUNT = 3;

export class QuadrilateralValidator extends ShapeValidator {
  areValidCoords(listOfCoords: ListOfCoords<number>): boolean {
    if (listOfCoords.length !== new Set(listOfCoords.map(String)).size) {
      throw new Error(
        "Incorrect input data. You need 4 2d points to create a Quadrilateral",
      );
    }

    // Calculate slopes between pairs of points to check if they form a valid quadrilateral
    const slopes = this.calculateSlopes(listOfCoords);

    // Check if any three points have the same slope, which would mean they are collinear and do not form a valid quadrilateral
    return this.areSlopesDifferent(slopes);
  }

  private calculateSlopes(listOfCoords: ListOfCoords<number>): number[] {
    const slopes: number[] = [];
    listOfCoords.slice(0, listOfCoords.length - 1).forEach((point1, i) => {
      listOfCoords.slice(i + 1).forEach((point2) => {
        const [lowestX, highestX] = [point1[0], point2[0]].sort(
          (a, b) => a - b,
        ) as [number, number];
        const xProjection = highestX - lowestX;
        const [lowestY, highestY] = [point1[1], point2[1]].sort(
          (a, b) => a - b,
        ) as [number, number];
        const yProjection = highestY - lowestY;
        slopes.push(xProjection / yProjection);
      });
    });
    return slopes;
  }

  private areSlopesDifferent(slopes: number[]): boolean {
    return !slopes
      .map((slope) => {
        const approximateSlope = getApproximateValue(slope);
        return slopes.filter(
          (newSlope) => getApproximateValue(newSlope) === approximateSlope,
        ).length;
      })
      .some((count) => count >= DUPLICATE_SLOPE_COUNT);
  }

  areValidCoordsWithPoints(listOfPoints: [Point2d, Point2d, Point2d, Point2d]) {
    const listOfCoords = listOfPoints.map((point) => [
      point.coords.x,
      point.coords.y,
    ]) as ListOfCoords<number>;
    return this.areValidCoords(listOfCoords);
  }
}
