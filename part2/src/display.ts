import { Display } from "./bridge";
import { Circle, Square, Triangle } from "./shapes";
import { AreaVisitor, PerimeterVisitor } from "./visitor";

const square = new Square();
const circle = new Circle();
const triangle = new Triangle();

/////////////////////////////////////////////////////////////////////
// Bridge Pattern

const squareDisplay = new Display(square);

squareDisplay.showForTV();

squareDisplay.showForMobile();

const circleDisplay = new Display(circle);

circleDisplay.showForTV();

circleDisplay.showForMobile();

const triangleDisplay = new Display(triangle);

triangleDisplay.showForTV();

triangleDisplay.showForMobile();

/////////////////////////////////////////////////////////////////////

// Visitor Pattern

const areaVisitor = new AreaVisitor();
const perimeterVisitor = new PerimeterVisitor();

square.accept(areaVisitor);
square.accept(perimeterVisitor);
