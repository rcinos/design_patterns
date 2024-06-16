import { ProcessingStrategy } from "./strategy";
import { IBankProduct } from "./decorator";

export class BankProduct implements IBankProduct {
  balance: number = 0;
  interestRate: number;
  subscriptionType: string;
  rawCreditLimit: number;
  private strategy: ProcessingStrategy;

  setStrategy(strategy: ProcessingStrategy): void {
    this.strategy = strategy;
  }

  calculateCreditLimit(): void {
    this.strategy.process(this);
  }

  deductFee(): void {
    this.strategy.process(this);
  }
}

interface IBankProductBuilder {
  setInterestRate(interestRate: number): void;
  setSubscriptionType(subscriptionType: string): void;
  setRawCreditLimit(creditLimit: number): void;
  build(): BankProduct;
}

export class BankProductBuilder implements IBankProductBuilder {
  private product: BankProduct;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.product = new BankProduct();
  }

  setInterestRate(interestRate: number) {
    this.product.interestRate = interestRate;
  }

  setSubscriptionType(subscriptionType: string) {
    this.product.subscriptionType = subscriptionType;
  }

  build(): BankProduct {
    const product = this.product;
    this.reset();
    return product;
  }

  setRawCreditLimit(creditLimit: number) {
    this.product.rawCreditLimit = creditLimit;
  }
}

export class Director {
  private builder: IBankProductBuilder;

  setBuilder(builder: IBankProductBuilder): void {
    this.builder = builder;
  }

  buildProSubscriber(): void {
    this.builder.setInterestRate(0.1);
    this.builder.setSubscriptionType("Pro");
    this.builder.setRawCreditLimit(1000);
  }

  buildPremiumSubscriber(): void {
    this.builder.setInterestRate(0.2);
    this.builder.setSubscriptionType("Premium");
    this.builder.setRawCreditLimit(500);
  }

  buildBasicSubscriber(): void {
    this.builder.setInterestRate(0.05);
    this.builder.setSubscriptionType("Basic");
    this.builder.setRawCreditLimit(100);
  }
}
