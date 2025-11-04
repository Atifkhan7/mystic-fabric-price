export interface ProductVariant {
  id: string;
  title: string;
  price: number;
  hidden?: boolean;
}

export interface MetafieldPricing {
  width: number;
  fabricPanels: number;
  basePrice: number;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  variants: ProductVariant[];
  metafields: {
    pricingTable: MetafieldPricing[];
    dropOptions: { value: string; priceModifier: number }[];
  };
}
