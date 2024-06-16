import { BankProductBuilder, Director } from "./builder";
import { CalculateInterestStrategy, DeductFeesStrategy } from "./strategy";

// calculations for a basic subscriber
const builder = new BankProductBuilder();

const director = new Director();

director.setBuilder(builder);
director.buildBasicSubscriber();

const basicSubscriber = builder.build();

const interestStrategy = new CalculateInterestStrategy();
const feeStrategy = new DeductFeesStrategy();

basicSubscriber.setStrategy(interestStrategy);

basicSubscriber.calculateCreditLimit();

basicSubscriber.setStrategy(feeStrategy);

basicSubscriber.deductFee();
