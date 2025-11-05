import { Product } from "@/types/product";

export const mockProduct: Product = {
  id: "curtain-001",
  title: "Premium Curtain Collection",
  description: "High-quality curtains with customizable width and drop options. Perfect for any room.",
  variants: [
    {
      id: "fabric-panel-var",
      title: "Fabric Panels",
      price: 0,
      hidden: true,
    },
    {
      id: "drop-var",
      title: "Drop",
      price: 0,
      hidden: false,
    },
  ],
  metafields: {
    pricingTable: [
      { width: 100, fabricPanels: 2, basePrice: 120, image: "/src/assets/curtain-100cm.jpg" },
      { width: 150, fabricPanels: 3, basePrice: 180, image: "/src/assets/curtain-150cm.jpg" },
      { width: 200, fabricPanels: 4, basePrice: 240, image: "/src/assets/curtain-200cm.jpg" },
      { width: 250, fabricPanels: 5, basePrice: 300, image: "/src/assets/curtain-250cm.jpg" },
      { width: 300, fabricPanels: 6, basePrice: 360, image: "/src/assets/curtain-300cm.jpg" },
    ],
    dropOptions: [
      { value: "137cm", priceModifier: 0 },
      { value: "183cm", priceModifier: 20 },
      { value: "229cm", priceModifier: 40 },
      { value: "274cm", priceModifier: 60 },
    ],
  },
};
