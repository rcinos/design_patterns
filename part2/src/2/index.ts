// Using Builder to create a bank product
import { ConcreteBankProductBuilder } from "./builder";
import {
  ConcreteBankProduct,
  OverdraftDecorator,
  RewardsDecorator,
} from "./decorator";
import { CalculateInterestStrategy, DeductFeesStrategy } from "./strategy";

const builder = new ConcreteBankProductBuilder();
const product = builder
  .setAccountType("Savings")
  .setBalance(1000)
  .setInterestRate(0.05)
  .build();

const bankProduct = new ConcreteBankProduct(product);
console.log(bankProduct.getDescription()); // Output: Type: Savings, Balance: 1000, Interest Rate: 0.05

// Using Decorator to add functionalities
const productWithOverdraft = new OverdraftDecorator(bankProduct, 200);
console.log(productWithOverdraft.getDescription()); // Output: Type: Savings, Balance: 1000, Interest Rate: 0.05, Overdraft Limit: 200

const productWithRewards = new RewardsDecorator(productWithOverdraft, 500);
console.log(productWithRewards.getDescription()); // Output: Type: Savings, Balance: 1000, Interest Rate: 0.05, Overdraft Limit: 200, Rewards Points: 500

// Using Strategy to process products
const calculateInterest = new CalculateInterestStrategy();
calculateInterest.process(productWithRewards); // Output: Calculated interest: 50

const deductFees = new DeductFeesStrategy();
deductFees.process(productWithRewards); // Output: Balance after fee deduction: 790
