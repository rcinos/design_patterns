import { Repository } from "../src/repository";
import { fileReader } from "../fileReader";
import { QuadrilateralFactory } from "../src/factories/shapeFactory/implemented/quadrilateralFactory";
import { SphereManager } from "../src/managers/shapeManager/extended/shape3dManager/extended/sphereManager";
import { warehouse } from "../src/shapeWarehouse";
import { QuadrilateralManager } from "../src/managers/shapeManager/extended/shape2dManager/extended/quadrilateralManager";
import { SphereFactory } from "../src/factories/shapeFactory/implemented/sphereFactory";

const coordsForQuadrilateral = fileReader(
  "C:\\projects\\ts\\design_patterns\\resources\\InstancesCoordinates\\validQuadrilateral.txt",
);

const coordsForSphere = fileReader(
  "C:\\projects\\ts\\design_patterns\\resources\\InstancesCoordinates\\validSphere.txt",
);

const sphereManager = new SphereManager();
const quadrilateralManager = new QuadrilateralManager();

describe("Warehouse", () => {
  const repository: Repository = Repository.getInstance();
  const quadrilateralFactory = new QuadrilateralFactory();
  const sphereFactory = new SphereFactory();

  test.each(coordsForQuadrilateral)(
    "getPerimeter method should return a shape perimeter",
    (coords) => {
      const quadrilateral = quadrilateralFactory.createShape(coords);
      repository.add(quadrilateral);
      warehouse.getPerimeter(quadrilateral);
      expect(warehouse.getPerimeter(quadrilateral)).toBe(
        quadrilateralManager.calculatePerimeter(quadrilateral),
      );
    },
  );

  test.each(coordsForSphere)(
    "getVolume method should return a shape perimeter",
    (coords) => {
      const sphere = sphereFactory.createShape(coords);
      repository.add(sphere);
      expect(warehouse.getVolume(sphere)).toBe(
        sphereManager.calculateVolume(sphere),
      );
    },
  );

  test.each(coordsForQuadrilateral)(
    "getArea method should return a shape area",
    (coords) => {
      const quadrilateral = quadrilateralFactory.createShape(coords);
      repository.add(quadrilateral);
      warehouse.getPerimeter(quadrilateral);
      expect(warehouse.getArea(quadrilateral)).toBe(
        quadrilateralManager.calculateArea(quadrilateral),
      );
    },
  );
});
