import { Sphere } from "../../../../../entities/shape/extended/sphere";
import { Shape3dManager } from "../shape3dManager";
import { Plane3dDimensions } from "../../../../types/planeDimensions";
import { promises } from "fs";
import { logs } from "../../../../../constants";

export class SphereManager extends Shape3dManager {
  calculateArea(shape: Sphere): number {
    console.log("Sphere's area");
    promises.writeFile(logs, "Sphere's area - " + "\n", {
      flag: "a",
      encoding: "utf8",
    });
    return 4 * Math.PI * shape.radius ** 2;
  }

  calculateVolume(shape: Sphere) {
    console.log("Sphere's volume");
    promises.writeFile(logs, "Sphere's volume - " + "\n", {
      flag: "a",
      encoding: "utf8",
    });
    return (4 / 3) * Math.PI * shape.radius ** 3;
  }

  doesShapeTouchPlane(shape: Sphere, plane?: Plane3dDimensions): boolean {
    if (plane) {
      return Math.abs(shape.center.coords[plane]) <= shape.radius;
    }
    for (let dimension in shape.center.coords) {
      if (Math.abs(shape.center.coords[dimension] as number) <= shape.radius) {
        return true;
      }
    }
    return false;
  }

  volumesRatioByPlaneDivision(
    shape: Sphere,
    plane: Plane3dDimensions,
  ): number | never {
    if (!this.doesShapeTouchPlane(shape, plane)) {
      throw new TypeError("The sphere does not touch the plane");
    }
    const topHeight = shape.radius - Math.abs(shape.center.coords[plane]);
    const bottomHeight = Math.abs(shape.center.coords[plane]) + shape.radius;
    // 1 / 6 * pi * h * (h**2 + 3*r**2)
    // according to this formula, which calculates a volume of a hemisphere
    const result =
      (topHeight * (topHeight ** 2 + 3 * shape.radius ** 2)) /
      (bottomHeight * (bottomHeight ** 2 + 3 * shape.radius ** 2));
    console.log("Sphere's volumes' ratio by " + plane + "division - " + result);
    promises.writeFile(
      logs,
      "Sphere's volumes' ratio by " + plane + " division - " + result + "\n",
      {
        flag: "a",
        encoding: "utf8",
      },
    );
    return result;
  }
}
