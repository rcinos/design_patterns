export type TObserver<Subscriber extends Updatable> = {
  event: string;
  subscriber: Subscriber;
  hook?: any;
  to?: any;
};

export type Updatable = {
  update(event: string, hook?: any, to?: any): void;
};
