import { Shape } from "./entities/shape";
import { Cone } from "./entities/cone";

type TComparator<T> = (a: T, b: T) => number;

export class Comparator {
  public static byFirstPoint<T extends Shape>(
    point: "x" | "y" | "z",
  ): TComparator<T> {
    return (a, b) => {
      let pointA = a.coords?.[0];
      let pointB = b.coords?.[0];
      if (a instanceof Cone) {
        pointA = a.center;
      }
      if (b instanceof Cone) {
        pointB = b.center;
      }
      if (!pointA || !pointB) {
        throw new Error("Invalid point index");
      }
      return (
        (pointA.coords[point] as number) - (pointB.coords[point] as number)
      );
    };
  }
}
