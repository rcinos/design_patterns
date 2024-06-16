import { ShapeManager } from "../../shapeManager";
import { Plane3dDimensions } from "../../../types/planeDimensions";
import { Shape3d, Sphere } from "../../../../entities/shape/extended/sphere";

export abstract class Shape3dManager extends ShapeManager {
  abstract calculateVolume(shape: Shape3d): number;

  abstract volumesRatioByPlaneDivision(
    shape: Sphere,
    plane: Plane3dDimensions,
  ): number | never;

  abstract doesShapeTouchPlane(
    shape: Sphere,
    plane: Plane3dDimensions,
  ): boolean;
}
