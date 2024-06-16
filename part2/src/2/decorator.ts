export interface IBankProduct {
  balance: number;
  interestRate: number;
  subscriptionType: string;
  rawCreditLimit: number;
  calculateCreditLimit(): void;
  deductFee(): void;
}

export class Decorator implements IBankProduct {
  protected product: IBankProduct;

  constructor(product: IBankProduct) {
    this.product = product;
  }

  get balance(): number {
    return this.product.balance;
  }

  get interestRate(): number {
    return this.product.interestRate;
  }

  get subscriptionType(): string {
    return this.product.subscriptionType;
  }

  get rawCreditLimit(): number {
    return this.product.rawCreditLimit;
  }

  calculateCreditLimit(): void {
    this.product.calculateCreditLimit();
  }

  deductFee(): void {
    this.product.deductFee();
  }
}

export class ProSubscriberDecorator extends Decorator {
  calculateCreditLimit(): void {
    console.log("Calculating credit limit for Pro subscriber");
    this.product.calculateCreditLimit();
  }
}

export class PremiumSubscriberDecorator extends Decorator {
  calculateCreditLimit(): void {
    console.log("Calculating credit limit for Premium subscriber");
    this.product.calculateCreditLimit();
  }
}
