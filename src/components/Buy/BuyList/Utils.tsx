import { Item } from "../../../types/Buy.types";

const sortProducts = (array: Array<Item>) => {
  return array.sort((a: Item, b: Item) => {
    if (a.category < b.category) {
      return -1;
    } else if (a.category > b.category) {
      return 1;
    } else {
      if (a.product < b.product) {
        return -1;
      }
      if (a.product > b.product) {
        return 1;
      }
      return 0;
    }
  });
};

export { sortProducts };
