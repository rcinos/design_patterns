import { Oval, Shape2d } from "../entities/oval";
import { Point2d } from "../entities/point2d";
import { Shape2dManager } from "./shape2dManager";
import { Shape } from "../entities/shape";

export class OvalManager extends Shape2dManager {
  private center: Point2d;
  private radiusX: number;
  private radiusY: number;

  extractInfo(shape: Oval): void {
    this.center = shape.center;
    this.radiusX = shape.radiusX;
    this.radiusY = shape.radiusY;
  }

  calculateArea(shape: Shape): number {
    this.extractInfo(shape as Oval);
    const area = Math.PI * this.radiusX * this.radiusY;
    console.log(`Calculated area: ${area}`);
    return area;
  }

  calculatePerimeter(shape: Shape2d): number {
    this.extractInfo(shape as Oval);
    const a = this.radiusX;
    const b = this.radiusY;
    const perimeter =
      Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
    console.log(`Calculated perimeter: ${perimeter}`);
    return perimeter;
  }

  isCircle(shape: Oval): boolean {
    this.extractInfo(shape);
    const isCircle = this.radiusX === this.radiusY;
    console.log(`Is shape a circle: ${isCircle}`);
    return isCircle;
  }

  doesShapeIntersectAxisAtDistance(
    shape: Oval,
    distance: number,
    axis: "x" | "y",
  ): boolean {
    this.extractInfo(shape);
    const distanceToXAxis = Math.abs(this.center.coords.y);
    const distanceToYAxis = Math.abs(this.center.coords.x);

    const intersectsXAxis =
      distanceToXAxis + this.radiusY >= distance &&
      distanceToXAxis - this.radiusY <= distance;
    const intersectsYAxis =
      distanceToYAxis + this.radiusX >= distance &&
      distanceToYAxis - this.radiusX <= distance;

    const intersects = axis === "x" ? intersectsXAxis : intersectsYAxis;
    console.log(
      `Does shape intersect ${axis}-axis at distance ${distance}: ${intersects}`,
    );
    return intersects;
  }
}
