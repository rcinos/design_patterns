export type TShapeObserver<
  Subscriber extends Updatable<string, Shape>,
  Shape,
> = {
  action: string;
  subscriber: Subscriber;
  target: Shape;
};

export type Updatable<Action, Target> = {
  update(action: Action, target: Target): void;
};
