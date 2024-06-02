import { describe, test, expect } from "@jest/globals";
import * as fs from "fs";
import { SphereFactory } from "../src/factories/shapeFactory/implemented/sphereFactory";
import { Sphere } from "../src/entities/shape/extended/sphere";
import { SphereManager } from "../src/managers/shapeManager/extended/shape3dManager/extended/sphereManager";

const validPath =
  "C:\\projects\\ts\\design_patterns\\resources\\InstancesCoordinates\\validSphere.txt";
const invalidPath =
  "C:\\projects\\ts\\design_patterns\\resources\\InstancesCoordinates\\invalidSphere.txt";

const data = fs.readFileSync(validPath, "utf8");
const invalidData = fs.readFileSync(invalidPath, "utf8");
const coordsList = data.split("\n").map((str) => str.replace("\r", ""));
const invalidCoordsList = invalidData
  .split("\n")
  .map((str) => [str.replace("\r", "")]);
const sphereFactory = new SphereFactory();

describe("Sphere creation", () => {
  // Define tests for each coordinate
  test.each(coordsList)("valid spheres - %s", (coords) => {
    expect(sphereFactory.createShape(coords)).toBeInstanceOf(Sphere);
  });
  test.each(invalidCoordsList)("invalid spheres - %s", (coords) => {
    try {
      sphereFactory.createShape(coords);
    } catch (err) {
      expect(err.message).toBe(
        "Incorrect input data. You need 1 3d point and positive radius to create a sphere",
      );
    }
  });
});

describe("Sphere calculations", () => {
  let coordsAssigner = 0;

  function initializeFields() {
    const sphere = sphereFactory.createShape(
      coordsList[coordsAssigner] as string,
    );
    const manager = new SphereManager(sphere);
    coordsAssigner += 1;
    return { sphere, manager };
  }

  test("Sphere's volume", () => {
    const { sphere, manager } = initializeFields();
    manager.calculateVolume();
    expect(sphere.volume).toBeCloseTo(113.04, 1 / 10 ** 12);
  });
  test("Sphere's volume", () => {
    const { sphere, manager } = initializeFields();
    manager.calculateVolume();
    expect(sphere.volume).toBeCloseTo(523.6, 1 / 10 ** 12);
  });
  test("Sphere's volume", () => {
    const { sphere, manager } = initializeFields();
    manager.calculateVolume();
    expect(sphere.volume).toBeCloseTo(4188.79, 1 / 10 ** 12);
  });
  test("Sphere's volume", () => {
    const { sphere, manager } = initializeFields();
    manager.calculateVolume();
    expect(sphere.volume).toBeCloseTo(7238.23, 1 / 10 ** 12);
  });
  test("Sphere's volume", () => {
    const { sphere, manager } = initializeFields();
    manager.calculateVolume();
    expect(sphere.volume).toBeCloseTo(0.524, 1 / 10 ** 12);
  });
  test("Sphere's area", () => {
    coordsAssigner = 0;
    const { sphere, manager } = initializeFields();
    manager.calculateArea();
    expect(sphere.area).toBeCloseTo(113.04, 1 / 10 ** 12);
  });
  test("Sphere's area", () => {
    const { sphere, manager } = initializeFields();
    manager.calculateArea();
    expect(sphere.area).toBeCloseTo(314.16, 1 / 10 ** 12);
  });
  test("Sphere's area", () => {
    const { sphere, manager } = initializeFields();
    manager.calculateArea();
    expect(sphere.area).toBeCloseTo(1256.64, 1 / 10 ** 12);
  });
  test("Sphere's area", () => {
    const { sphere, manager } = initializeFields();
    manager.calculateArea();
    expect(sphere.area).toBeCloseTo(1809.56, 1 / 10 ** 12);
  });
  test("Sphere's area", () => {
    const { sphere, manager } = initializeFields();
    manager.calculateArea();
    expect(sphere.area).toBeCloseTo(3.14, 1 / 10 ** 12);
  });
});
