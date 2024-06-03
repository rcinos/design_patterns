import * as fs from "fs";
import { OvalFactory } from "./src/factories/ovalFactory";
import { repository } from "./src/repository";
import { ovalManager as manager } from "./src/managers/ovalManager";
import { Point2d } from "./src/entities/point2d";
import { warehouse } from "./src/shapeWarehouse";
import { coneManager } from "./src/managers/coneManager";
import { ConeFactory } from "./src/factories/coneFactory";

fs.readFile(
  "C:\\projects\\ts\\design_patterns\\resources\\InstancesCoordinates\\invalidOval.txt",
  "utf8",
  (err, _data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    const ovalFactory = new OvalFactory();
    const oval = ovalFactory.createShape("-4 -2.5 -1 -2.5 -1 -5 -4 -5");
    const oval2 = ovalFactory.createShape("-4 -2.5 -1 -2.5 -1 -5 -4 -5");

    repository.add(oval);
    console.log("perimeter", warehouse.getPerimeter(oval));
    oval.coords = [
      new Point2d({ x: 2, y: 2 }),
      new Point2d({ x: 5, y: 2 }),
      new Point2d({ x: 5, y: 0 }),
      new Point2d({ x: 2, y: 0 }),
    ];
    repository.add(oval2);
    console.log(repository.findShapesByPropertyRange("perimeter", [0, 10]));
    console.log("warehouse perimeter", warehouse.getPerimeter(oval));
    console.log("perimeter", manager.calculatePerimeter(oval));
    // console.log(repository.findShapesByPropertyRange("perimeter", [0, 10]));
  },
);

fs.readFile(
  "C:\\projects\\ts\\design_patterns\\resources\\InstancesCoordinates\\validCone.txt",
  "utf8",
  (err, _data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    const coneFactory = new ConeFactory();
    const cone = coneFactory.createShape("-0.1 0 -0.1 0.5");
    repository.add(cone);
    console.log(coneManager.calculateVolume(cone), cone.id, cone.radius);
  },
);
