// BankProduct class
export class BankProduct {
  accountType: string;
  balance: number;
  interestRate: number;

  constructor() {
    this.accountType = "";
    this.balance = 0;
    this.interestRate = 0;
  }
}

// Builder interface
interface BankProductBuilder {
  setAccountType(accountType: string): this;
  setBalance(balance: number): this;
  setInterestRate(interestRate: number): this;
  build(): BankProduct;
}

// Concrete Builder
export class ConcreteBankProductBuilder implements BankProductBuilder {
  private product: BankProduct;

  constructor() {
    this.product = new BankProduct();
  }

  setAccountType(accountType: string): this {
    this.product.accountType = accountType;
    return this;
  }

  setBalance(balance: number): this {
    this.product.balance = balance;
    return this;
  }

  setInterestRate(interestRate: number): this {
    this.product.interestRate = interestRate;
    return this;
  }

  build(): BankProduct {
    return this.product;
  }
}
