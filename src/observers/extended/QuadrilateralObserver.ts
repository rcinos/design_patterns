import { ShapeObserver } from "../ShapeObserver";
import { Quadrilateral } from "../../entities/shape/extended/quadrilateral";
import { TShapeObserver, Updatable } from "../types/TShapeObserver";

export class QuadrilateralObserver implements ShapeObserver {
  private listeners: TShapeObserver<unknown, Quadrilateral>[] =
    {} as TShapeObserver<unknown, Quadrilateral>[];
  private static instance: QuadrilateralObserver;

  private constructor() {}

  static getInstance() {
    if (!QuadrilateralObserver.instance) {
      QuadrilateralObserver.instance = new QuadrilateralObserver();
    }
    return QuadrilateralObserver.instance;
  }

  subscribe({
    action,
    subscriber,
    target,
  }: TShapeObserver<unknown, Quadrilateral>): void {
    this.listeners.forEach((listener) => {
      if (
        listener.action === action &&
        listener.subscriber === subscriber &&
        listener.target === target
      ) {
        return;
      }
      this.listeners.push({ action, subscriber, target });
    });
  }

  unsubscribe({
    action,
    subscriber,
    target,
  }: TShapeObserver<unknown, Quadrilateral>): void {
    this.listeners.filter(
      (listener) =>
        listener.action !== action &&
        listener.subscriber !== subscriber &&
        listener.target !== target,
    );
  }

  notify<T extends Updatable<string, Quadrilateral>>({
    action,
    subscriber,
    target,
  }: TShapeObserver<T, Quadrilateral>): void {
    const listener = this.listeners.find(
      (listener) =>
        listener.action === action &&
        listener.target === target &&
        listener.subscriber === subscriber,
    );

    if (listener) {
      subscriber.update(action, target);
    }
  }
}
