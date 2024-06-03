import { describe, test, expect } from "@jest/globals";
import * as fs from "fs";
import { ConeFactory } from "../src/factories/coneFactory";
import { Cone } from "../src/entities/cone";
import { ConeManager } from "../src/managers/coneManager";

const validPath =
  "C:\\projects\\ts\\design_patterns\\resources\\InstancesCoordinates\\validCone.txt";
const invalidPath =
  "C:\\projects\\ts\\design_patterns\\resources\\InstancesCoordinates\\invalidCone.txt";

const data = fs.readFileSync(validPath, "utf8");
const invalidData = fs.readFileSync(invalidPath, "utf8");
const coordsList = data.split("\n").map((str) => str.replace("\r", ""));
const invalidCoordsList = invalidData
  .split("\n")
  .map((str) => [str.replace("\r", "")]);
const coneFactory = new ConeFactory();
const manager = new ConeManager();

describe("Cone creation", () => {
  // Define tests for each coordinate
  test.each(coordsList)("valid cones - %s", (coords) => {
    expect(coneFactory.createShape(coords)).toBeInstanceOf(Cone);
  });
  test.each(invalidCoordsList)("invalid cones - %s", (coords) => {
    try {
      coneFactory.createShape(coords);
    } catch (err) {
      expect(err.message).toBe(
        "Incorrect input data. You need 1 3d point and positive radius to create a cone",
      );
    }
  });
});

describe("Cone calculations", () => {
  let coordsAssigner = 0;

  function initializeFields() {
    const cone = coneFactory.createShape(coordsList[coordsAssigner] as string);
    coordsAssigner += 1;
    return { cone, manager };
  }

  test("Cone's volume", () => {
    const { cone, manager } = initializeFields();
    const volume = manager.calculateVolume(cone);
    expect(volume).toBeCloseTo(113.04, 1 / 10 ** 12);
  });
  test("Cone's volume", () => {
    const { cone, manager } = initializeFields();
    const volume = manager.calculateVolume(cone);
    expect(volume).toBeCloseTo(523.6, 1 / 10 ** 12);
  });
  test("Cone's volume", () => {
    const { cone, manager } = initializeFields();
    const volume = manager.calculateVolume(cone);
    expect(volume).toBeCloseTo(4188.79, 1 / 10 ** 12);
  });
  test("Cone's volume", () => {
    const { cone, manager } = initializeFields();
    const volume = manager.calculateVolume(cone);
    expect(volume).toBeCloseTo(7238.23, 1 / 10 ** 12);
  });
  test("Cone's volume", () => {
    const { cone, manager } = initializeFields();
    const volume = manager.calculateVolume(cone);
    expect(volume).toBeCloseTo(0.524, 1 / 10 ** 12);
  });
  test("Cone's area", () => {
    coordsAssigner = 0;
    const { cone, manager } = initializeFields();
    const area = manager.calculateArea(cone);
    expect(area).toBeCloseTo(113.04, 1 / 10 ** 12);
  });
  test("Cone's area", () => {
    const { cone, manager } = initializeFields();
    const area = manager.calculateArea(cone);
    expect(area).toBeCloseTo(314.16, 1 / 10 ** 12);
  });
  test("Cone's area", () => {
    const { cone, manager } = initializeFields();
    const area = manager.calculateArea(cone);
    expect(area).toBeCloseTo(1256.64, 1 / 10 ** 12);
  });
  test("Cone's area", () => {
    const { cone, manager } = initializeFields();
    const area = manager.calculateArea(cone);
    expect(area).toBeCloseTo(1809.56, 1 / 10 ** 12);
  });
  test("Cone's area", () => {
    const { cone, manager } = initializeFields();
    const area = manager.calculateArea(cone);
    expect(area).toBeCloseTo(3.14, 1 / 10 ** 12);
  });
});
