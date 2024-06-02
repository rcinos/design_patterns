export abstract class Shape {
  abstract readonly id: number;
  abstract readonly name: string;

  abstract changeCoords(coords: unknown): void;
}
