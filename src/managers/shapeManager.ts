import { Shape } from "../entities/shape";

export abstract class ShapeManager {
  abstract calculateArea(shape: Shape): number;

  protected calculateCosBetweenSides(
    sideA: number,
    sideB: number,
    diagonal: number,
  ): number {
    // cos theorem implementation
    return (sideA ** 2 + sideB ** 2 - diagonal ** 2) / (2 * sideA * sideB);
  }
}
