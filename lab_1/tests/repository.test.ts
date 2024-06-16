import { Quadrilateral } from "../../src/entities/shape/extended/quadrilateral";
import { Sphere } from "../../src/entities/shape/extended/sphere";
import { Repository } from "../../src/repository";
import { fileReader } from "../fileReader";
import { QuadrilateralFactory } from "../../src/factories/shapeFactory/implemented/quadrilateralFactory";
import { SphereFactory } from "../../src/factories/shapeFactory/implemented/sphereFactory";
import { SphereManager } from "../../src/managers/shapeManager/extended/shape3dManager/extended/sphereManager";
import { QuadrilateralManager } from "../../src/managers/shapeManager/extended/shape2dManager/extended/quadrilateralManager";

const coordsForQuadrilateral = fileReader(
  "C:\\projects\\ts\\design_patterns\\resources\\InstancesCoordinates\\validQuadrilateral.txt",
);

const coordsForSphere = fileReader(
  "C:\\projects\\ts\\design_patterns\\resources\\InstancesCoordinates\\validSphere.txt",
);
let counter = 0;

const sphereManager = new SphereManager();
const quadrilateralManager = new QuadrilateralManager();

describe("Repository", () => {
  const repository: Repository = Repository.getInstance();
  const quadrilateralFactory = new QuadrilateralFactory();
  const sphereFactory = new SphereFactory();
  let sphere: Sphere;
  let quadrilateral: Quadrilateral;

  beforeEach(() => {
    repository.reset();
    quadrilateral = quadrilateralFactory.createShape(
      coordsForQuadrilateral[counter] as string,
    );
    sphere = sphereFactory.createShape(coordsForSphere[counter] as string);
  });

  test("add method should add a shape to the repository", () => {
    repository.add(quadrilateral);
    expect(repository.findById(quadrilateral.id)).toStrictEqual(quadrilateral);
  });

  test("remove method should remove a shape from the repository", () => {
    repository.add(quadrilateral);
    repository.remove(quadrilateral);
    expect(repository.findById(quadrilateral.id)).toBeUndefined();
  });

  test("findById method should return a shape by its id", () => {
    repository.add(quadrilateral);
    expect(repository.findById(quadrilateral.id)).toStrictEqual(quadrilateral);
  });

  test("findByCoords method should return shapes by their coordinates", () => {
    repository.add(quadrilateral);
    expect(repository.findByCoords(quadrilateral.coords)).toContain(
      quadrilateral,
    );
  });

  test("findByName method should return shapes by their name", () => {
    repository.add(quadrilateral);
    expect(repository.findByName(quadrilateral.name)).toContain(quadrilateral);
  });

  test("findByQuadrant method should return shapes by their quadrant", () => {
    repository.add(quadrilateral);
    expect(repository.findByQuadrant(1)).toContain(quadrilateral);
  });

  test("findShapesByPropertyRange method should return shapes by their property range", () => {
    repository.add(sphere);
    repository.add(quadrilateral);
    const toContain = [];
    if (
      sphereManager.calculateArea(sphere) >= 0 &&
      sphereManager.calculateArea(sphere) <= 10
    ) {
      toContain.push(sphere);
    }
    if (
      quadrilateralManager.calculateArea(quadrilateral) >= 0 &&
      quadrilateralManager.calculateArea(quadrilateral) <= 10
    ) {
      toContain.push(quadrilateral);
    }
    console.log(toContain);
    expect(repository.findShapesByPropertyRange("area", [0, 10])).toEqual(
      toContain,
    );
  });

  test("findByDistanceFromOrigin method should return shapes by their distance from origin", () => {
    repository.add(sphere);
    expect(repository.findByDistanceFromOrigin(Math.sqrt(2))).toEqual([sphere]);
  });

  test("sortById method should return shapes sorted by their id", () => {
    repository.add(quadrilateral);
    repository.add(sphere);

    expect(repository.sortById()).toEqual(
      [quadrilateral, sphere].sort((a, b) => a.id.localeCompare(b.id)),
    );
  });

  test("sortByNames method should return shapes sorted by their name", () => {
    repository.add(quadrilateral);
    repository.add(sphere);
    expect(repository.sortByNames()).toEqual([quadrilateral, sphere]);
  });

  test("sortByFirstPoint method should return shapes sorted by their first point", () => {
    repository.add(quadrilateral);
    repository.add(sphere);
    expect(repository.sortByFirstPoint("x")).toEqual([sphere, quadrilateral]);
  });
});
