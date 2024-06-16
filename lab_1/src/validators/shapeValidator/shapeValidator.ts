export abstract class ShapeValidator {
  isCoordsLengthValid(listOfPoints: string[], amount: number): boolean {
    return listOfPoints.length === amount;
  }

  abstract areValidCoords(listOfCoords: any[]): boolean;
}
