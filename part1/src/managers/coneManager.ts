import { Cone } from "../entities/cone";
import { Point3d } from "../entities/point3d";
import { Shape3dManager } from "./shape3dManager";
import { Plane3dDimensions } from "./types/planeDimensions";

export class ConeManager extends Shape3dManager {
  private cone: Cone;
  private center: Point3d;
  private radius: number;
  private height: number;

  extractInfo(shape: Cone) {
    this.cone = shape;
    this.center = shape.center;
    this.radius = shape.radius;
    this.height = shape.height;
  }

  calculateVolume(shape: Cone): number {
    this.extractInfo(shape);
    const volume = (1 / 3) * Math.PI * this.cone.radius ** 2 * this.cone.height;
    console.log(`Calculated volume: ${volume}`);
    return volume;
  }

  calculateArea(shape: Cone): number {
    this.extractInfo(shape as Cone);
    const l = Math.sqrt(this.radius ** 2 + this.height ** 2);
    const area = Math.PI * this.radius * (this.radius + l);
    console.log(`Calculated area: ${area}`);
    return area;
  }

  doesShapeTouchPlane(shape: Cone, plane: Plane3dDimensions): boolean {
    this.extractInfo(shape);
    let touchesPlane;
    switch (plane.toLowerCase()) {
      case "z":
        touchesPlane =
          this.center.coords.z === 0 || this.center.coords.z === this.height;
        break;
      case "y":
        touchesPlane =
          this.center.coords.y === 0 || this.center.coords.y === this.height;
        break;
      case "x":
        touchesPlane =
          this.center.coords.x === 0 || this.center.coords.x === this.height;
        break;
      default:
        throw new Error("Invalid plane");
    }
    console.log(`Does shape touch ${plane}-plane: ${touchesPlane}`);
    return touchesPlane;
  }

  volumesRatioByPlaneDivision(shape: Cone, plane: Plane3dDimensions): number {
    this.extractInfo(shape);
    const h = this.cone.height;
    let slicedHeight;

    switch (plane.toLowerCase()) {
      case "xy":
        slicedHeight =
          this.center.coords.z > 0
            ? this.center.coords.z
            : h - this.center.coords.z;
        break;
      case "xz":
        slicedHeight =
          this.center.coords.y > 0
            ? this.center.coords.y
            : h - this.center.coords.y;
        break;
      case "yz":
        slicedHeight =
          this.center.coords.x > 0
            ? this.center.coords.x
            : h - this.center.coords.x;
        break;
      default:
        throw new Error("Invalid plane");
    }

    const ratio = (slicedHeight / h) ** 3;
    console.log(`Volume ratio by ${plane}-plane division: ${ratio}`);
    return ratio;
  }
}
