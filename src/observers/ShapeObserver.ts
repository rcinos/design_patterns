import { TShapeObserver, Updatable } from "./types/TShapeObserver";
import { Quadrilateral } from "../entities/shape/extended/quadrilateral";
import { Shape } from "../entities/shape/shape";

export class ShapeObserver {
  private listeners: TShapeObserver<any, Shape>[] = [];
  private static instance: ShapeObserver;

  private constructor() {}

  static getInstance() {
    if (!ShapeObserver.instance) {
      ShapeObserver.instance = new ShapeObserver();
    }
    return ShapeObserver.instance;
  }

  subscribe<T extends Updatable<string, Shape>>({
    action,
    subscriber,
    target,
  }: TShapeObserver<T, Shape>): void {
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

  unsubscribe<T extends Updatable<string, Shape>>({
    action,
    subscriber,
    target,
  }: TShapeObserver<T, Shape>): void {
    this.listeners.filter(
      (listener) =>
        listener.action !== action &&
        listener.subscriber !== subscriber &&
        listener.target !== target,
    );
  }

  notify<T extends Updatable<string, Shape>>({
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
