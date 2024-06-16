// BankProduct interface
import { BankProduct } from "./builder";

export interface IBankProduct {
  getDescription(): string;
  getBalance(): number;
}

// Concrete BankProduct implementing IBankProduct
export class ConcreteBankProduct implements IBankProduct {
  private product: BankProduct;

  constructor(product: BankProduct) {
    this.product = product;
  }

  getDescription(): string {
    return `Type: ${this.product.accountType}, Balance: ${this.product.balance}, Interest Rate: ${this.product.interestRate}`;
  }

  getBalance(): number {
    return this.product.balance;
  }
}

// Decorator base class
export class BankProductDecorator implements IBankProduct {
  protected decoratedProduct: IBankProduct;

  constructor(decoratedProduct: IBankProduct) {
    this.decoratedProduct = decoratedProduct;
  }

  getDescription(): string {
    return this.decoratedProduct.getDescription();
  }

  getBalance(): number {
    return this.decoratedProduct.getBalance();
  }
}

// Concrete Decorator: Overdraft
export class OverdraftDecorator extends BankProductDecorator {
  private overdraftLimit: number;

  constructor(decoratedProduct: IBankProduct, overdraftLimit: number) {
    super(decoratedProduct);
    this.overdraftLimit = overdraftLimit;
  }

  getDescription(): string {
    return `${super.getDescription()}, Overdraft Limit: ${this.overdraftLimit}`;
  }

  getBalance(): number {
    return super.getBalance() - this.overdraftLimit;
  }
}

// Concrete Decorator: Rewards
export class RewardsDecorator extends BankProductDecorator {
  private rewardsPoints: number;

  constructor(decoratedProduct: IBankProduct, rewardsPoints: number) {
    super(decoratedProduct);
    this.rewardsPoints = rewardsPoints;
  }

  getDescription(): string {
    return `${super.getDescription()}, Rewards Points: ${this.rewardsPoints}`;
  }
}
