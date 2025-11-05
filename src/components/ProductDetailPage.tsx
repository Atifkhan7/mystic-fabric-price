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
import curtain100 from "@/assets/curtain-100cm.jpg";
import curtain150 from "@/assets/curtain-150cm.jpg";
import curtain200 from "@/assets/curtain-200cm.jpg";
import curtain250 from "@/assets/curtain-250cm.jpg";
import curtain300 from "@/assets/curtain-300cm.jpg";

interface ProductDetailPageProps {
  product: Product;
}

export const ProductDetailPage = ({ product }: ProductDetailPageProps) => {
  const [selectedWidth, setSelectedWidth] = useState<number | null>(null);
  const [selectedDrop, setSelectedDrop] = useState<string | null>(null);
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);
  const [fabricPanels, setFabricPanels] = useState<number>(0);
  const [currentImage, setCurrentImage] = useState<string>(curtain100);
  const [isImageTransitioning, setIsImageTransitioning] = useState(false);

  const imageMap: Record<string, string> = {
    "/src/assets/curtain-100cm.jpg": curtain100,
    "/src/assets/curtain-150cm.jpg": curtain150,
    "/src/assets/curtain-200cm.jpg": curtain200,
    "/src/assets/curtain-250cm.jpg": curtain250,
    "/src/assets/curtain-300cm.jpg": curtain300,
  };

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
        
        // Update image with smooth transition
        const newImage = imageMap[pricingEntry.image];
        if (newImage && newImage !== currentImage) {
          setIsImageTransitioning(true);
          setTimeout(() => {
            setCurrentImage(newImage);
            setTimeout(() => setIsImageTransitioning(false), 50);
          }, 150);
        }
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
    <div className="min-h-screen w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* Product Image */}
          <div className="w-full lg:sticky lg:top-8">
            <div className="aspect-square w-full overflow-hidden rounded-lg border border-border bg-muted shadow-sm">
              <img 
                src={currentImage} 
                alt={product.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  isImageTransitioning ? "opacity-0" : "opacity-100"
                }`}
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col space-y-4 sm:space-y-6 w-full">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">{product.title}</h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          {/* Width Selection */}
          <div className="space-y-2 w-full">
            <Label htmlFor="width" className="text-sm sm:text-base font-medium">Width (cm)</Label>
            <Select
              onValueChange={(value) => setSelectedWidth(Number(value))}
            >
              <SelectTrigger id="width" className="w-full h-11 sm:h-12">
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
          <div className="space-y-2 w-full">
            <Label htmlFor="drop" className="text-sm sm:text-base font-medium">Drop</Label>
            <Select onValueChange={setSelectedDrop}>
              <SelectTrigger id="drop" className="w-full h-11 sm:h-12">
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
            <div className="text-xs sm:text-sm text-muted-foreground">
              Calculated fabric panels: {fabricPanels}
            </div>
          )}

          {/* Price Display */}
          <div className="pt-4 sm:pt-6 border-t border-border">
            {calculatedPrice > 0 ? (
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                ${calculatedPrice.toFixed(2)}
              </div>
            ) : (
              <div className="text-lg sm:text-xl text-muted-foreground">
                Select options to see price
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            size="lg"
            className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold"
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
    </div>
  );
};
