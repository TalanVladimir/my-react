interface Item {
  id: number;
  category: string;
  product: string;
  multiply: string;
  price: string;
  email: string;
}

interface Product {
  id: number;
  category: string;
  product: string;
}

export type { Item, Product };
