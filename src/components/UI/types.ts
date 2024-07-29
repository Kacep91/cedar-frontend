export type ProductCardType = {
  quantity?: number;
  name: string;
  volume: string | null;
  price: string | null;
  oldPrice: number | null;
  isSale: Boolean;
  isHit: Boolean;
  isNew: Boolean;
  reviews: number | null;
  image: string;
  amount: number;
  id: string;
};

export type ProductCardTypeWithQuantity = {
  data: ProductCardType;
  quantity?: number;
};
