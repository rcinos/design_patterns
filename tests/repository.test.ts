import { Oval } from "../src/entities/oval";
import { Cone } from "../src/entities/cone";
import { Repository } from "../src/repository";
import { OvalFactory } from "../src/factories/ovalFactory";
import { ConeFactory } from "../src/factories/coneFactory";
import { ConeManager } from "../src/managers/coneManager";
import { OvalManager } from "../src/managers/ovalManager";
import { warehouse } from "../src/warehouse";
import fs from "fs";

function reader(path: string): string[] {
  const data = fs.readFileSync(path, "utf8");
  return data.split("\n").map((str) => str.replace("\r", ""));
}

const coordsForOval = reader("./coordinates/validOval.txt");

const coordsForCone = reader("./coordinates/validCone.txt");
let counter = 0;

const coneManager = new ConeManager();
const ovalManager = new OvalManager();

describe("Repository", () => {
  const repository: Repository = Repository.getInstance();
  const ovalFactory = new OvalFactory();
  const coneFactory = new ConeFactory();
  let cone: Cone;
  let oval: Oval;

  beforeEach(() => {
    repository.reset();
    oval = ovalFactory.createShape(coordsForOval[counter] as string);
    cone = coneFactory.createShape(coordsForCone[counter] as string);
  });

  test("add method should add a shape to the repository", () => {
    repository.add(oval);
    expect(repository.findById(oval.id)).toStrictEqual(oval);
  });

  test("remove method should remove a shape from the repository", () => {
    repository.add(oval);
    repository.remove(oval);
    expect(repository.findById(oval.id)).toBeUndefined();
  });

  test("findById method should return a shape by its id", () => {
    repository.add(oval);
    expect(repository.findById(oval.id)).toStrictEqual(oval);
  });

  test("findByCoords method should return shapes by their coordinates", () => {
    repository.add(oval);
    expect(repository.findByCoords(oval.center)).toContain(oval);
  });

  test("findByName method should return shapes by their name", () => {
    repository.add(oval);
    expect(repository.findByName(oval.name)).toContain(oval);
  });

  test("findByQuadrant method should return shapes by their quadrant", () => {
    repository.add(oval);
    expect(repository.findByQuadrant(1)).toStrictEqual([]);
  });

  test("findShapesByPropertyRange method should return shapes by their property range", () => {
    repository.add(cone);
    repository.add(oval);
    const toContain = [];
    if (
      coneManager.calculateArea(cone) >= 0 &&
      coneManager.calculateArea(cone) <= 10
    ) {
      toContain.push(cone);
    }
    if (
      ovalManager.calculateArea(oval) >= 0 &&
      ovalManager.calculateArea(oval) <= 10
    ) {
      toContain.push(oval);
    }
    console.log(toContain);
    expect(repository.findShapesByPropertyRange("area", [0, 10])).toEqual(
      toContain,
    );
  });

  test("findByDistanceFromOrigin method should return shapes by their distance from origin", () => {
    repository.add(cone);
    expect(repository.findByDistanceFromOrigin(Math.sqrt(8))).toEqual([cone]);
  });

  test("sortById method should return shapes sorted by their id", () => {
    repository.add(oval);
    repository.add(cone);
    expect(repository.sortById()).toEqual(
      [oval, cone].sort((a, b) => a.id.localeCompare(b.id)),
    );
  });

  test("sortByNames method should return shapes sorted by their name", () => {
    repository.add(oval);
    repository.add(cone);
    expect(repository.sortByNames()).toEqual(
      [oval, cone].sort((a, b) => a.name.localeCompare(b.name)),
    );
  });

  test("sortByFirstPoint method should return shapes sorted by their first point", () => {
    repository.add(oval);
    repository.add(cone);
    expect(repository.sortByFirstPoint("x")).toEqual(
      [oval, cone].sort((a, b) => a.center.coords.x - b.center.coords.x),
    );
  });
});

describe("Warehouse", () => {
  const repository: Repository = Repository.getInstance();
  const ovalFactory = new OvalFactory();
  const coneFactory = new ConeFactory();

  test.each(coordsForOval)(
    "getPerimeter method should return a shape perimeter",
    (coords) => {
      const oval = ovalFactory.createShape(coords);
      repository.add(oval);
      warehouse.getPerimeter(oval);
      expect(warehouse.getPerimeter(oval)).toBe(
        ovalManager.calculatePerimeter(oval),
      );
    },
  );

  test.each(coordsForCone)(
    "getVolume method should return a shape perimeter",
    (coords) => {
      const cone = coneFactory.createShape(coords);
      repository.add(cone);
      expect(warehouse.getVolume(cone)).toBe(coneManager.calculateVolume(cone));
    },
  );

  test.each(coordsForOval)(
    "getArea method should return a shape area",
    (coords) => {
      const oval = ovalFactory.createShape(coords);
      repository.add(oval);
      warehouse.getPerimeter(oval);
      expect(warehouse.getArea(oval)).toBe(ovalManager.calculateArea(oval));
    },
  );
});
