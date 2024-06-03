import { TObserver, Updatable } from "./TObserver";

export class Observer {
  private listeners: TObserver<any>[] = [];
  private static instance: Observer;

  private constructor() {}

  static getInstance() {
    if (!Observer.instance) {
      Observer.instance = new Observer();
    }
    return Observer.instance;
  }

  subscribe<T extends Updatable>({
    event,
    to,
    subscriber,
  }: TObserver<T>): void {
    const existingListener = this.listeners.find(
      (listener) =>
        listener.event === event &&
        listener.subscriber === subscriber &&
        listener.to === to,
    );

    if (!existingListener) {
      this.listeners.push({ event, to, subscriber });
    }
  }

  unsubscribe<T extends Updatable>({
    event,
    to,
    subscriber,
  }: TObserver<T>): void {
    this.listeners = this.listeners.filter(
      (listener) =>
        listener.event !== event &&
        listener.subscriber !== subscriber &&
        listener.to !== to,
    );
  }

  notify<T extends Updatable>({
    event,
    to,
    subscriber,
    hook,
  }: TObserver<T>): void {
    const listener = this.listeners.find(
      (listener) =>
        listener.event === event && listener.subscriber === subscriber,
    );
    if (listener) {
      subscriber.update(event, hook, to);
    }
  }
}

export const observer = Observer.getInstance();
