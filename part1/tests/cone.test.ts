import { describe, test, expect } from "@jest/globals";
import * as fs from "fs";
import { ConeFactory } from "../src/factories/coneFactory";
import { Cone } from "../src/entities/cone";
import { ConeManager } from "../src/managers/coneManager";

const validPath = "./coordinates/validCone.txt";
const invalidPath = "./coordinates/invalidCone.txt";

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
        "Invalid coordinates for a Cone. Please provide 1 3d point and radius and height.",
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
    expect(volume).toBeCloseTo(221.3985062739847, 1 / 10 ** 12);
  });
  test("Cone's volume", () => {
    const { cone, manager } = initializeFields();
    const volume = manager.calculateVolume(cone);
    expect(volume).toBeCloseTo(626.464991052, 1 / 10 ** 12);
  });
  test("Cone's volume", () => {
    const { cone, manager } = initializeFields();
    const volume = manager.calculateVolume(cone);
    expect(volume).toBeCloseTo(2563.79093274, 1 / 10 ** 12);
  });
  test("Cone's volume", () => {
    const { cone, manager } = initializeFields();
    const volume = manager.calculateVolume(cone);
    expect(volume).toBeCloseTo(3833.00483676, 1 / 10 ** 12);
  });
  test("Cone's volume", () => {
    const { cone, manager } = initializeFields();
    const volume = manager.calculateVolume(cone);
    expect(volume).toBeCloseTo(9.8017690792, 1 / 10 ** 12);
  });
  test("Cone's area", () => {
    coordsAssigner = 0;
    const { cone, manager } = initializeFields();
    const area = manager.calculateArea(cone);
    expect(area).toBeCloseTo(246.5639418863, 1 / 10 ** 12);
  });
  test("Cone's area", () => {
    const { cone, manager } = initializeFields();
    const area = manager.calculateArea(cone);
    expect(area).toBeCloseTo(459.1724054, 1 / 10 ** 12);
  });
  test("Cone's area", () => {
    const { cone, manager } = initializeFields();
    const area = manager.calculateArea(cone);
    expect(area).toBeCloseTo(1146.68167693, 1 / 10 ** 12);
  });
  test("Cone's area", () => {
    const { cone, manager } = initializeFields();
    const area = manager.calculateArea(cone);
    expect(area).toBeCloseTo(1515.751385098, 1 / 10 ** 12);
  });
  test("Cone's area", () => {
    const { cone, manager } = initializeFields();
    const area = manager.calculateArea(cone);
    expect(area).toBeCloseTo(50.15286670693, 1 / 10 ** 12);
  });
});
