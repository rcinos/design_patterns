import { Cone } from "./entities/cone";
import { Oval } from "./entities/oval";

type TComparator<T> = (a: T, b: T) => number;

export class Comparator {
  public static byFirstPoint<T extends Oval | Cone>(
    point: "x" | "y" | "z",
  ): TComparator<T> {
    return (a, b) => a.center.coords[point] - b.center.coords[point];
  }
}
