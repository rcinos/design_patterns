import * as fs from "fs";
import { QuadrilateralFactory } from "./src/factories/shapeFactory/implemented/quadrilateralFactory";
import { repository } from "./src/repository";
import { quadrilateralManager as manager } from "./src/managers/shapeManager/extended/shape2dManager/extended/quadrilateralManager";
import { Point2d } from "./src/entities/point/implemented/point2d";
import { warehouse } from "./src/shapeWarehouse";
import { sphereManager } from "./src/managers/shapeManager/extended/shape3dManager/extended/sphereManager";
import { SphereFactory } from "./src/factories/shapeFactory/implemented/sphereFactory";

fs.readFile(
  "C:\\projects\\ts\\design_patterns\\resources\\InstancesCoordinates\\invalidQuadrilateral.txt",
  "utf8",
  (err, _data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    const quadrilateralFactory = new QuadrilateralFactory();
    const quadrilateral = quadrilateralFactory.createShape(
      "-4 -2.5 -1 -2.5 -1 -5 -4 -5",
    );
    const quadrilateral2 = quadrilateralFactory.createShape(
      "-4 -2.5 -1 -2.5 -1 -5 -4 -5",
    );

    repository.add(quadrilateral);
    console.log("perimeter", warehouse.getPerimeter(quadrilateral));
    quadrilateral.coords = [
      new Point2d({ x: 2, y: 2 }),
      new Point2d({ x: 5, y: 2 }),
      new Point2d({ x: 5, y: 0 }),
      new Point2d({ x: 2, y: 0 }),
    ];
    repository.add(quadrilateral2);
    console.log(repository.findShapesByPropertyRange("perimeter", [0, 10]));
    console.log("warehouse perimeter", warehouse.getPerimeter(quadrilateral));
    console.log("perimeter", manager.calculatePerimeter(quadrilateral));
    // console.log(repository.findShapesByPropertyRange("perimeter", [0, 10]));
  },
);

fs.readFile(
  "C:\\projects\\ts\\design_patterns\\resources\\InstancesCoordinates\\validSphere.txt",
  "utf8",
  (err, _data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    const sphereFactory = new SphereFactory();
    const sphere = sphereFactory.createShape("-0.1 0 -0.1 0.5");
    repository.add(sphere);
    console.log(
      sphereManager.calculateVolume(sphere),
      sphere.id,
      sphere.radius,
    );
  },
);
