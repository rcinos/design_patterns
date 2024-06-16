import { Shape } from "./shapes";

interface IDisplay {
  showForTV(): void;
  showForMobile(): void;
  showForPrinter(): void;
  showForSmartWatch(): void;
}

export class Display implements IDisplay {
  protected shape: Shape;

  constructor(shape: Shape) {
    this.shape = shape;
  }

  showForTV(): void {
    this.shape.showForTV();
  }
  showForMobile(): void {
    this.shape.showForMobile();
  }
  showForPrinter(): void {
    this.shape.showForPrinter();
  }
  showForSmartWatch(): void {
    this.shape.showForSmartWatch();
  }
}
