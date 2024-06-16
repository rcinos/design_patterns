import { Product } from "../shop";

interface Strategy {
  sort(products: Product[]): Product[];
}

export class CreationSortingStrategy implements Strategy {
  sort(products: Product[]): Product[] {
    return products.sort(
      (a, b) => Number(a.getCreationDate()) - Number(b.getCreationDate()),
    );
  }
}

export class ExpirationSortingStrategy implements Strategy {
  sort(products: Product[]): Product[] {
    return products.sort(
      (a, b) => Number(a.getExpirationDate()) - Number(b.getExpirationDate()),
    );
  }
}

export class NameSortingStrategy implements Strategy {
  sort(products: Product[]): Product[] {
    return products.sort();
  }
}
