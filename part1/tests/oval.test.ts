import { OvalFactory } from "../src/factories/ovalFactory";
import { describe, expect, test } from "@jest/globals";
import * as fs from "fs";
import { Oval } from "../src/entities/oval";
import { OvalManager } from "../src/managers/ovalManager";

const validPath = "./coordinates/validOval.txt";
const invalidPath = "./coordinates/invalidOval.txt";

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
        "Invalid coordinates for a Oval. Please provide 1 2d point and 2 radius.",
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
    expect(perimeter).toBeCloseTo(16.20900706, 1 / 10 ** 12);
  });
  test("Oval's perimeter", () => {
    const { oval, manager } = initializeFields();
    const perimeter = manager.calculatePerimeter(oval);
    expect(perimeter).toBeCloseTo(23.6121050996, 1 / 10 ** 12);
  });
  test("Oval's perimeter", () => {
    const { oval, manager } = initializeFields();
    const perimeter = manager.calculatePerimeter(oval);
    expect(perimeter).toBeCloseTo(41.1157972632, 1 / 10 ** 12);
  });
  test("Oval's perimeter", () => {
    const { oval, manager } = initializeFields();
    const perimeter = manager.calculatePerimeter(oval);
    expect(perimeter).toBeCloseTo(50.3245558305, 1 / 10 ** 12);
  });
  test("Oval's perimeter", () => {
    const { oval, manager } = initializeFields();
    const perimeter = manager.calculatePerimeter(oval);
    expect(perimeter).toBeCloseTo(2.672887957447, 1 / 10 ** 12);
  });
  test("Oval's area", () => {
    coordsAssigner = 0;
    const { oval, manager } = initializeFields();
    const area = manager.calculateArea(oval);
    expect(area).toBeCloseTo(19.47787445225, 1 / 10 ** 12);
  });
  test("Oval's area", () => {
    const { oval, manager } = initializeFields();
    const area = manager.calculateArea(oval);
    expect(area).toBeCloseTo(33.64645731994, 1 / 10 ** 12);
  });
  test("Oval's area", () => {
    const { oval, manager } = initializeFields();
    const area = manager.calculateArea(oval);
    expect(area).toBeCloseTo(34.903094381, 1 / 10 ** 12);
  });
  test("Oval's area", () => {
    const { oval, manager } = initializeFields();
    const area = manager.calculateArea(oval);
    expect(area).toBeCloseTo(79.8278693277, 1 / 10 ** 12);
  });
  test("Oval's area", () => {
    const { oval, manager } = initializeFields();
    const area = manager.calculateArea(oval);
    expect(area).toBeCloseTo(0.3769911184307, 1 / 10 ** 12);
  });
});
