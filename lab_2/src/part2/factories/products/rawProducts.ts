import { Beef, Chicken, Fish } from "../interfaces";

export class RawChicken implements Chicken {
  getExpirationDate() {
    return new Date();
  }

  getCreationDate(): Date {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date;
  }

  getName(): string {
    return "raw chicken";
  }
}

export class RawFish implements Fish {
  getExpirationDate() {
    return new Date();
  }

  getCreationDate(): Date {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date;
  }

  getName(): string {
    return "raw fish";
  }
}

export class RawBeef implements Beef {
  getExpirationDate() {
    return new Date();
  }

  getCreationDate(): Date {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date;
  }

  getName(): string {
    return "raw beef";
  }
}
