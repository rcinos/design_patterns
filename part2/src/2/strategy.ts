// Strategy interface
import { IBankProduct } from "./decorator";

interface ProcessingStrategy {
  process(product: IBankProduct): void;
}

export class CalculateInterestStrategy implements ProcessingStrategy {
  process(product: IBankProduct): void {
    const balance = product.getBalance();
    const interest = balance * 0.05; // Simplified interest calculation
    console.log(`Calculated interest: ${interest}`);
  }
}

// Concrete Strategy: Deduct Fees
export class DeductFeesStrategy implements ProcessingStrategy {
  process(product: IBankProduct): void {
    const balance = product.getBalance();
    const fee = 10; // Simplified fee deduction
    const newBalance = balance - fee;
    console.log(`Balance after fee deduction: ${newBalance}`);
  }
}
