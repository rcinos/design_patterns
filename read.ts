import * as fs from "fs";
import { SphereFactory } from "./src/factories/shapeFactory/implemented/sphereFactory";
import { SphereManager } from "./src/managers/shapeManager/extended/shape3dManager/extended/sphereManager";
import { QuadrilateralFactory } from "./src/factories/shapeFactory/implemented/quadrilateralFactory";
import { QuadrilateralObserver } from "./src/observers/extended/QuadrilateralObserver";

fs.readFile(
  "C:\\projects\\ts\\design_patterns\\resources\\InstancesCoordinates\\invalidQuadrilateral.txt",
  "utf8",
  (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    console.log(data);
    const quadrilateralFactory = new QuadrilateralFactory();
    const quadrilateral = quadrilateralFactory.createShape(
      "-4 -2.5 -1 -2.5 -1 -5 -4 -5",
    );
    const observer = QuadrilateralObserver.getInstance();
  },
);

fs.readFile(
  "C:\\projects\\ts\\design_patterns\\resources\\InstancesCoordinates\\validSphere.txt",
  "utf8",
  (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    console.log(data);
    const sphereFactory = new SphereFactory();
    const sphere = sphereFactory.createShape("-0.1 0 -0.1 0.5");
    const sphereManager = new SphereManager(sphere);
    sphereManager.calculateArea();
    sphereManager.calculateVolume();
    console.log(sphere.volume, sphere.area);
  },
);
