import { ShapeManager } from "./shapeManager";
import { Plane3dDimensions } from "./types/planeDimensions";
import { Shape3d, Cone } from "../entities/cone";

export abstract class Shape3dManager extends ShapeManager {
  abstract calculateVolume(shape: Shape3d): number;

  abstract volumesRatioByPlaneDivision(
    shape: Cone,
    plane: Plane3dDimensions,
  ): number | never;

  abstract doesShapeTouchPlane(shape: Cone, plane: Plane3dDimensions): boolean;
}
