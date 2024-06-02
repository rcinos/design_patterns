import { ShapeManager } from "../../shapeManager";
import { Plane3dDimensions } from "../../../types/planeDimensions";
import { Sphere } from "../../../../entities/shape/extended/sphere";

export abstract class Shape3dManager extends ShapeManager {
  abstract calculateVolume(shape: Sphere): number;

  abstract volumesRatioByPlaneDivision(
    shape: Sphere,
    plane: Plane3dDimensions,
  ): number | never;

  abstract doesShapeTouchPlane(
    shape: Sphere,
    plane: Plane3dDimensions,
  ): boolean;
}
