import * as fs from "fs";
import { OvalFactory } from "./src/factories/ovalFactory";
import { OvalManager } from "./src/managers/ovalManager";

fs.readFile(
  "C:\\projects\\ts\\design_patterns\\coordinates\\invalidOval.txt",
  "utf8",
  (err, _data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    const ovalFactory = new OvalFactory();
    const oval = ovalFactory.createShape("2 0 2 3.1");
    const oval1 = ovalFactory.createShape("2.1 0 2.1 5.1");
    const oval2 = ovalFactory.createShape("-1.1 0 1.1 10.1");
    const oval3 = ovalFactory.createShape("-2.1 0 2.1 12.1");
    const oval4 = ovalFactory.createShape("-0.2 0 0.2 0.6");

    const manager = new OvalManager();

    console.log(manager.calculatePerimeter(oval), manager.calculateArea(oval));
    console.log(
      manager.calculatePerimeter(oval1),
      manager.calculateArea(oval1),
    );
    console.log(
      manager.calculatePerimeter(oval2),
      manager.calculateArea(oval2),
    );
    console.log(
      manager.calculatePerimeter(oval3),
      manager.calculateArea(oval3),
    );
    console.log(
      manager.calculatePerimeter(oval4),
      manager.calculateArea(oval4),
    );
  },
);
