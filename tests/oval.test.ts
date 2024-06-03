import { OvalFactory } from "../src/factories/ovalFactory";
import { describe, expect, test } from "@jest/globals";
import * as fs from "fs";
import { Oval } from "../src/entities/oval";
import { OvalManager } from "../src/managers/ovalManager";

const validPath =
  "C:\\projects\\ts\\design_patterns\\resources\\InstancesCoordinates\\validOval.txt";
const invalidPath =
  "C:\\projects\\ts\\design_patterns\\resources\\InstancesCoordinates\\invalidOval.txt";

const data = fs.readFileSync(validPath, "utf8");
const invalidData = fs.readFileSync(invalidPath, "utf8");

const coordsList = data.split("\n").map((str) => str.replace("\r", ""));
const invalidCoordsList = invalidData
  .split("\n")
  .map((str) => [str.replace("\r", "")]);

const ovalFactory = new OvalFactory();
const manager = new OvalManager();

describe("Oval creation", () => {
  // Define tests for each coordinate
  test.each(coordsList)("valid ovals - %s", (coords) => {
    expect(ovalFactory.createShape(coords)).toBeInstanceOf(Oval);
  });
  test.each(invalidCoordsList)("invalid ovals - %s", (coords) => {
    try {
      ovalFactory.createShape(coords);
    } catch (err) {
      expect(err.message).toBe(
        "Incorrect input data. You need 4 2d points to create a Oval",
      );
    }
  });
});

describe("Oval calculations", () => {
  let coordsAssigner = 0;

  function initializeFields() {
    const oval = ovalFactory.createShape(coordsList[coordsAssigner] as string);
    coordsAssigner += 1;
    return { oval, manager };
  }

  test("Oval's perimeter", () => {
    const { oval, manager } = initializeFields();
    console.log(manager, oval);
    const perimeter = manager.calculatePerimeter(oval);
    expect(perimeter).toBeCloseTo(11.404918347287664, 1 / 10 ** 12);
  });
  test("Oval's perimeter", () => {
    const { oval, manager } = initializeFields();
    const perimeter = manager.calculatePerimeter(oval);
    expect(perimeter).toBeCloseTo(8, 1 / 10 ** 12);
  });
  test("Oval's perimeter", () => {
    const { oval, manager } = initializeFields();
    const perimeter = manager.calculatePerimeter(oval);
    expect(perimeter).toBeCloseTo(12, 1 / 10 ** 12);
  });
  test("Oval's perimeter", () => {
    const { oval, manager } = initializeFields();
    const perimeter = manager.calculatePerimeter(oval);
    expect(perimeter).toBeCloseTo(15.8, 1 / 10 ** 12);
  });
  test("Oval's perimeter", () => {
    const { oval, manager } = initializeFields();
    const perimeter = manager.calculatePerimeter(oval);
    expect(perimeter).toBeCloseTo(11, 1 / 10 ** 12);
  });
  test("Oval's area", () => {
    coordsAssigner = 0;
    const { oval, manager } = initializeFields();
    const area = manager.calculateArea(oval);
    expect(area).toBeCloseTo(6, 1 / 10 ** 12);
  });
  test("Oval's area", () => {
    const { oval, manager } = initializeFields();
    const area = manager.calculateArea(oval);
    expect(area).toBeCloseTo(4, 1 / 10 ** 12);
  });
  test("Oval's area", () => {
    const { oval, manager } = initializeFields();
    const area = manager.calculateArea(oval);
    expect(area).toBeCloseTo(9, 1 / 10 ** 12);
  });
  test("Oval's area", () => {
    const { oval, manager } = initializeFields();
    const area = manager.calculateArea(oval);
    expect(area).toBeCloseTo(14.04, 1 / 10 ** 12);
  });
  test("Oval's area", () => {
    const { oval, manager } = initializeFields();
    const area = manager.calculateArea(oval);
    expect(area).toBeCloseTo(7.5, 1 / 10 ** 12);
  });
});
