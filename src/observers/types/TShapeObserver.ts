export type TShapeObserver<Subscriber extends Updatable> = {
  action: string;
  subscriber: Subscriber;
  payload?: any;
};

export type Updatable = {
  update(action: string, payload?: any): void;
};
