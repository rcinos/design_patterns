import { Quadrilateral } from "../../../../../entities/shape/extended/quadrilateral";
import { Point2d } from "../../../../../entities/point/implemented/point2d";
import { Shape2dManager } from "../shape2dManager";
import { promises } from "fs";
import { logs } from "../../../../../constants";
import { getApproximateValue } from "../../../../../functions/getApproximateValue";

export class QuadrilateralManager extends Shape2dManager {
  shape: Quadrilateral;
  coords: [Point2d, Point2d, Point2d, Point2d];
  private sides: {
    topSide: number;
    leftSide: number;
    rightSide: number;
    bottomSide: number;
  };
  private diagonalBottomLeftToTopRight: number;
  private diagonalTopLeftToBottomRight: number;

  extractInfo(shape: Quadrilateral) {
    this.shape = shape;
    this.coords = this.shape.coords;
    this.sides = {
      topSide: this.calculateSide(this.coords[0], this.coords[1]),
      rightSide: this.calculateSide(this.coords[1], this.coords[2]),
      bottomSide: this.calculateSide(this.coords[2], this.coords[3]),
      leftSide: this.calculateSide(this.coords[3], this.coords[0]),
    };
    this.diagonalBottomLeftToTopRight = this.calculateSide(
      this.coords[3],
      this.coords[1],
    );
    this.diagonalTopLeftToBottomRight = this.calculateSide(
      this.coords[0],
      this.coords[2],
    );
  }

  calculatePerimeter(shape: Quadrilateral) {
    this.extractInfo(shape);
    console.log("Quadrilateral's perimeter");
    promises.writeFile(logs, "Quadrilateral's perimeter" + "\n", {
      flag: "a",
      encoding: "utf8",
    });
    return Object.values(this.sides).reduce((acc, side) => acc + side, 0);
  }

  calculateArea(shape: Quadrilateral) {
    this.extractInfo(shape);
    const sinBetweenTopAndRightSides = Math.sqrt(
      1 -
        this.calculateCosBetweenSides(
          this.sides.topSide,
          this.sides.rightSide,
          this.diagonalTopLeftToBottomRight,
        ) **
          2,
    );
    const sinBetweenBottomAndLeftSides = Math.sqrt(
      1 -
        this.calculateCosBetweenSides(
          this.sides.bottomSide,
          this.sides.leftSide,
          this.diagonalTopLeftToBottomRight,
        ) **
          2,
    );
    console.log("Quadrilateral's area");
    promises.writeFile(logs, "Quadrilateral's area - " + "\n", {
      flag: "a",
      encoding: "utf8",
    });
    return (
      0.5 *
        this.sides.bottomSide *
        this.sides.leftSide *
        sinBetweenBottomAndLeftSides +
      0.5 *
        this.sides.topSide *
        this.sides.rightSide *
        sinBetweenTopAndRightSides
    );
  }

  isConvex(shape: Quadrilateral): boolean {
    this.extractInfo(shape);
    const angleBetweenTopAndRightSides = Math.acos(
      this.calculateCosBetweenSides(
        this.sides.topSide,
        this.sides.rightSide,
        this.diagonalTopLeftToBottomRight,
      ),
    );
    const angleBetweenRightAndBottomSides = Math.acos(
      this.calculateCosBetweenSides(
        this.sides.rightSide,
        this.sides.bottomSide,
        this.diagonalBottomLeftToTopRight,
      ),
    );
    const angleBetweenBottomAndLeftSides = Math.acos(
      this.calculateCosBetweenSides(
        this.sides.bottomSide,
        this.sides.leftSide,
        this.diagonalTopLeftToBottomRight,
      ),
    );
    const angleBetweenLeftAndTopSides = Math.acos(
      this.calculateCosBetweenSides(
        this.sides.leftSide,
        this.sides.topSide,
        this.diagonalBottomLeftToTopRight,
      ),
    );
    console.log("Quadrilateral is convex");

    promises.writeFile(logs, "Quadrilateral is convex - " + "\n", {
      flag: "a",
      encoding: "utf8",
    });

    return (
      getApproximateValue(
        angleBetweenTopAndRightSides +
          angleBetweenRightAndBottomSides +
          angleBetweenBottomAndLeftSides +
          angleBetweenLeftAndTopSides,
      ) === getApproximateValue(2 * Math.PI)
    );
  }

  isRectangle(shape: Quadrilateral): boolean {
    this.extractInfo(shape);
    console.log("Quadrilateral is rectangle");
    promises.writeFile(logs, "Quadrilateral is rectangle - " + "\n", {
      flag: "a",
      encoding: "utf8",
    });
    return (
      this.isParallelogram(shape) &&
      this.diagonalTopLeftToBottomRight === this.diagonalBottomLeftToTopRight
    );
  }

  isRhombus(shape: Quadrilateral): boolean {
    this.extractInfo(shape);
    console.log("Quadrilateral is rhombus");
    promises.writeFile(logs, "Quadrilateral is rhombus - " + "\n", {
      flag: "a",
      encoding: "utf8",
    });
    // check if all sides are equal
    return (
      this.isConvex(shape) &&
      new Set([
        this.sides.topSide,
        this.sides.bottomSide,
        this.sides.leftSide,
        this.sides.rightSide,
      ]).size === 1
    );
  }

  isSquare(shape: Quadrilateral): boolean {
    this.extractInfo(shape);
    console.log("Quadrilateral is square");
    promises.writeFile(logs, "Quadrilateral is square - " + "\n", {
      flag: "a",
      encoding: "utf8",
    });
    return (
      this.isRhombus(shape) &&
      this.diagonalBottomLeftToTopRight === this.diagonalTopLeftToBottomRight
    );
  }

  isTrapezoid(shape: Quadrilateral): boolean {
    this.extractInfo(shape);
    if (!this.isConvex(shape)) {
      return false;
    }

    const sinTopSide = this.calculateSinBetweenSideAndProjection(
      this.coords[0],
      this.coords[1],
      this.sides.topSide,
      "x",
    );

    const sinBottomSide = this.calculateSinBetweenSideAndProjection(
      this.coords[2],
      this.coords[3],
      this.sides.bottomSide,
      "x",
    );

    const sinLeftSide = this.calculateSinBetweenSideAndProjection(
      this.coords[0],
      this.coords[2],
      this.sides.leftSide,
      "x",
    );

    const sinRightSide = this.calculateSinBetweenSideAndProjection(
      this.coords[1],
      this.coords[3],
      this.sides.rightSide,
      "x",
    );
    console.log("Quadrilateral is trapezoid");
    const fs = require("fs");

    fs.promises.writeFile(logs, "Quadrilateral is trapezoid - " + "\n", {
      flag: "a",
      encoding: "utf8",
    });
    return (
      (sinBottomSide === sinTopSide && sinLeftSide !== sinRightSide) ||
      (sinRightSide === sinLeftSide && sinBottomSide !== sinTopSide)
    );
  }

  private isParallelogram(shape: Quadrilateral): boolean {
    this.extractInfo(shape);
    return (
      this.isConvex(shape) &&
      this.sides.topSide === this.sides.bottomSide &&
      this.sides.leftSide === this.sides.rightSide
    );
  }
}
