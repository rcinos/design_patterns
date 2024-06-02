export type PointCoords = {
  x: number;
  y: number;
  z?: number;
};

export type Point3dCoords = {
  x: number;
  y: number;
  z: number;
  [key: string]: number;
};

export type Point2dCoords = {
  x: number;
  y: number;
  [key: string]: number;
};
