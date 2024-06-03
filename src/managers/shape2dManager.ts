import { ShapeManager } from "./shapeManager";
import { Point2d } from "../entities/point2d";
import { Plane2dDimensions } from "./types/planeDimensions";
import { getApproximateValue } from "../functions/getApproximateValue";
import { Shape2d } from "../entities/oval";

export abstract class Shape2dManager extends ShapeManager {
  abstract calculatePerimeter(shape: Shape2d): number;

  protected calculateSinBetweenSideAndProjection(
    pointA: Point2d,
    pointB: Point2d,
    side: number,
    plane: Plane2dDimensions,
  ) {
    return getApproximateValue(
      this.calculateProjection(pointA, pointB, plane) / side,
    );
  }

  protected calculateProjection(
    pointA: Point2d,
    pointB: Point2d,
    plane: Plane2dDimensions,
  ) {
    return Math.abs(pointA.coords[plane] - pointB.coords[plane]);
  }

  protected calculateSide(pointA: Point2d, pointB: Point2d): number {
    if (pointA.coords.x === pointB.coords.x) {
      return Math.abs(pointB.coords.y - pointA.coords.y);
    }
    if (pointA.coords.y === pointB.coords.y) {
      return Math.abs(pointB.coords.x - pointA.coords.x);
    }
    // Pythagoras theorem
    const sideA = Math.abs(pointB.coords.x - pointA.coords.x);
    const sideB = Math.abs(pointB.coords.y - pointA.coords.y);
    return Math.sqrt(sideB ** 2 + sideA ** 2);
  }
}
