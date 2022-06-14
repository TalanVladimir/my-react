import { Product } from "../../../types/Buy.types";

const sortProducts = (array: Array<Product>) => {
  return array.sort((a: Product, b: Product) => {
    if (a.product < b.product) {
      return -1;
    }
    if (a.product > b.product) {
      return 1;
    }
    return 0;
  });
};

const sortCategories = (array: Array<Product>) => {
  return array.sort((a: Product, b: Product) => {
    if (a.category < b.category) {
      return -1;
    } else if (a.category > b.category) {
      return 1;
    }
    return 0;
  });
};

export { sortProducts, sortCategories };
