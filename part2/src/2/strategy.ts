import { IBankProduct } from "./decorator";

export interface ProcessingStrategy {
  process(product: IBankProduct): void;
}

export class CalculateInterestStrategy implements ProcessingStrategy {
  process(product: IBankProduct): void {
    const interest = product.interestRate * 10;
    console.log(`Calculated interest: ${interest}`);
  }
}

export class DeductFeesStrategy implements ProcessingStrategy {
  process(product: IBankProduct): void {
    const balance = product.balance;
    const fee = 10;
    const newBalance = balance - fee;
    console.log(`Balance after fee deduction: ${newBalance}`);
  }
}
