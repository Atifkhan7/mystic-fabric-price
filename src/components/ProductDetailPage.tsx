import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "@/types/product";
import { toast } from "@/hooks/use-toast";

interface ProductDetailPageProps {
  product: Product;
}

export const ProductDetailPage = ({ product }: ProductDetailPageProps) => {
  const [selectedWidth, setSelectedWidth] = useState<number | null>(null);
  const [selectedDrop, setSelectedDrop] = useState<string | null>(null);
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);
  const [fabricPanels, setFabricPanels] = useState<number>(0);

  useEffect(() => {
    if (selectedWidth !== null && selectedDrop !== null) {
      const pricingEntry = product.metafields.pricingTable.find(
        (entry) => entry.width === selectedWidth
      );
      const dropOption = product.metafields.dropOptions.find(
        (option) => option.value === selectedDrop
      );

      if (pricingEntry && dropOption) {
        const totalPrice = pricingEntry.basePrice + dropOption.priceModifier;
        setCalculatedPrice(totalPrice);
        setFabricPanels(pricingEntry.fabricPanels);
      }
    }
  }, [selectedWidth, selectedDrop, product]);

  const handleAddToCart = () => {
    if (!selectedWidth || !selectedDrop) {
      toast({
        title: "Please select options",
        description: "Select both width and drop before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Added to cart",
      description: `${product.title} - Width: ${selectedWidth}cm, Drop: ${selectedDrop}`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Product Image Placeholder */}
        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground text-lg">Product Image</p>
        </div>

        {/* Product Details */}
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          {/* Width Selection */}
          <div className="space-y-2">
            <Label htmlFor="width">Width (cm)</Label>
            <Select
              onValueChange={(value) => setSelectedWidth(Number(value))}
            >
              <SelectTrigger id="width">
                <SelectValue placeholder="Select width" />
              </SelectTrigger>
              <SelectContent>
                {product.metafields.pricingTable.map((entry) => (
                  <SelectItem key={entry.width} value={entry.width.toString()}>
                    {entry.width}cm
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Drop Selection */}
          <div className="space-y-2">
            <Label htmlFor="drop">Drop</Label>
            <Select onValueChange={setSelectedDrop}>
              <SelectTrigger id="drop">
                <SelectValue placeholder="Select drop" />
              </SelectTrigger>
              <SelectContent>
                {product.metafields.dropOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Hidden Fabric Panels Info (for dev reference) */}
          {fabricPanels > 0 && (
            <div className="text-sm text-muted-foreground">
              Calculated fabric panels: {fabricPanels}
            </div>
          )}

          {/* Price Display */}
          <div className="pt-4 border-t border-border">
            {calculatedPrice > 0 ? (
              <div className="text-3xl font-bold">
                ${calculatedPrice.toFixed(2)}
              </div>
            ) : (
              <div className="text-xl text-muted-foreground">
                Select options to see price
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            size="lg"
            className="w-full"
            onClick={handleAddToCart}
            disabled={!selectedWidth || !selectedDrop}
          >
            {calculatedPrice > 0
              ? `Add to Cart - $${calculatedPrice.toFixed(2)}`
              : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
};
