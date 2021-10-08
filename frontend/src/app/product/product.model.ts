export interface ProductModel {
  id: string;
  name: string;
  description: string;
  price: number;
}

export type AddProductModel = Omit<ProductModel, 'id'>;

