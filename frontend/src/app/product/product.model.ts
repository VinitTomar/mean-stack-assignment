export interface ProductModel {
  id: string;
  name: string;
  description: string;
  price: number;
}

export type AddProductModel = Omit<ProductModel, 'id'>;

export type DeleteResponse = {
  affected: number;
  raw: any[]
};

