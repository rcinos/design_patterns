import { TShapeObserver, Updatable } from "./TShapeObserver";

export class ShapeObserver {
  private listeners: TShapeObserver<any>[] = [];
  private static instance: ShapeObserver;

  private constructor() {}

  static getInstance() {
    if (!ShapeObserver.instance) {
      ShapeObserver.instance = new ShapeObserver();
    }
    return ShapeObserver.instance;
  }

  subscribe<T extends Updatable>({
    action,
    subscriber,
  }: TShapeObserver<T>): void {
    const existingListener = this.listeners.find(
      (listener) =>
        listener.action === action && listener.subscriber === subscriber,
    );

    if (!existingListener) {
      this.listeners.push({ action, subscriber });
    }
  }

  unsubscribe<T extends Updatable>({
    action,
    subscriber,
  }: TShapeObserver<T>): void {
    this.listeners = this.listeners.filter(
      (listener) =>
        listener.action !== action && listener.subscriber !== subscriber,
    );
  }

  notify<T extends Updatable>({
    action,
    subscriber,
    payload,
  }: TShapeObserver<T>): void {
    const listener = this.listeners.find(
      (listener) =>
        listener.action === action && listener.subscriber === subscriber,
    );
    if (listener) {
      subscriber.update(action, payload);
    }
  }
}

export const observer = ShapeObserver.getInstance();
