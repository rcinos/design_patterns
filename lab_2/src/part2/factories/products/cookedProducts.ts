import { Beef, Chicken, Fish } from "../interfaces";

export class CookedChicken implements Chicken {
  getExpirationDate() {
    return new Date();
  }

  getCreationDate(): Date {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date;
  }

  getName(): string {
    return "cooked chicken";
  }
}

export class CookedFish implements Fish {
  getExpirationDate() {
    return new Date();
  }

  getCreationDate(): Date {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date;
  }

  getName(): string {
    return "cooked fish";
  }
}

export class CookedBeef implements Beef {
  getExpirationDate() {
    return new Date();
  }

  getCreationDate(): Date {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date;
  }

  getName(): string {
    return "cooked beef";
  }
}
