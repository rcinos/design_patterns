import { QuadrilateralFactory } from "../../src/factories/shapeFactory/implemented/quadrilateralFactory";
import { describe, expect, test } from "@jest/globals";
import * as fs from "fs";
import { Quadrilateral } from "../../src/entities/shape/extended/quadrilateral";
import { QuadrilateralManager } from "../../src/managers/shapeManager/extended/shape2dManager/extended/quadrilateralManager";

const validPath =
  "C:\\projects\\ts\\design_patterns\\resources\\InstancesCoordinates\\validQuadrilateral.txt";
const invalidPath =
  "C:\\projects\\ts\\design_patterns\\resources\\InstancesCoordinates\\invalidQuadrilateral.txt";

const data = fs.readFileSync(validPath, "utf8");
const invalidData = fs.readFileSync(invalidPath, "utf8");

const coordsList = data.split("\n").map((str) => str.replace("\r", ""));
const invalidCoordsList = invalidData
  .split("\n")
  .map((str) => [str.replace("\r", "")]);

const quadrilateralFactory = new QuadrilateralFactory();
const manager = new QuadrilateralManager();

describe("Quadrilateral creation", () => {
  // Define tests for each coordinate
  test.each(coordsList)("valid quadrilaterals - %s", (coords) => {
    expect(quadrilateralFactory.createShape(coords)).toBeInstanceOf(
      Quadrilateral,
    );
  });
  test.each(invalidCoordsList)("invalid quadrilaterals - %s", (coords) => {
    try {
      quadrilateralFactory.createShape(coords);
    } catch (err) {
      expect(err.message).toBe(
        "Incorrect input data. You need 4 2d points to create a Quadrilateral",
      );
    }
  });
});

describe("Quadrilateral calculations", () => {
  let coordsAssigner = 0;

  function initializeFields() {
    const quadrilateral = quadrilateralFactory.createShape(
      coordsList[coordsAssigner] as string,
    );
    coordsAssigner += 1;
    return { quadrilateral, manager };
  }

  test("Quadrilateral's perimeter", () => {
    const { quadrilateral, manager } = initializeFields();
    console.log(manager, quadrilateral);
    const perimeter = manager.calculatePerimeter(quadrilateral);
    expect(perimeter).toBeCloseTo(11.404918347287664, 1 / 10 ** 12);
  });
  test("Quadrilateral's perimeter", () => {
    const { quadrilateral, manager } = initializeFields();
    const perimeter = manager.calculatePerimeter(quadrilateral);
    expect(perimeter).toBeCloseTo(8, 1 / 10 ** 12);
  });
  test("Quadrilateral's perimeter", () => {
    const { quadrilateral, manager } = initializeFields();
    const perimeter = manager.calculatePerimeter(quadrilateral);
    expect(perimeter).toBeCloseTo(12, 1 / 10 ** 12);
  });
  test("Quadrilateral's perimeter", () => {
    const { quadrilateral, manager } = initializeFields();
    const perimeter = manager.calculatePerimeter(quadrilateral);
    expect(perimeter).toBeCloseTo(15.8, 1 / 10 ** 12);
  });
  test("Quadrilateral's perimeter", () => {
    const { quadrilateral, manager } = initializeFields();
    const perimeter = manager.calculatePerimeter(quadrilateral);
    expect(perimeter).toBeCloseTo(11, 1 / 10 ** 12);
  });
  test("Quadrilateral's area", () => {
    coordsAssigner = 0;
    const { quadrilateral, manager } = initializeFields();
    const area = manager.calculateArea(quadrilateral);
    expect(area).toBeCloseTo(6, 1 / 10 ** 12);
  });
  test("Quadrilateral's area", () => {
    const { quadrilateral, manager } = initializeFields();
    const area = manager.calculateArea(quadrilateral);
    expect(area).toBeCloseTo(4, 1 / 10 ** 12);
  });
  test("Quadrilateral's area", () => {
    const { quadrilateral, manager } = initializeFields();
    const area = manager.calculateArea(quadrilateral);
    expect(area).toBeCloseTo(9, 1 / 10 ** 12);
  });
  test("Quadrilateral's area", () => {
    const { quadrilateral, manager } = initializeFields();
    const area = manager.calculateArea(quadrilateral);
    expect(area).toBeCloseTo(14.04, 1 / 10 ** 12);
  });
  test("Quadrilateral's area", () => {
    const { quadrilateral, manager } = initializeFields();
    const area = manager.calculateArea(quadrilateral);
    expect(area).toBeCloseTo(7.5, 1 / 10 ** 12);
  });
});
