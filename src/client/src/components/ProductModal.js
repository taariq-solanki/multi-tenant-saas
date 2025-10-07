import React from "react";
import { motion } from "framer-motion";
import { useCart } from "../contexts/CartContext";
import { buyProduct } from "../api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { 
  ShoppingCart, 
  Heart, 
  Star,
  X
} from "lucide-react";
import toast from "react-hot-toast";

export default function ProductModal({ product, isOpen, onClose, tenantID, userID }) {
  const { addToCart } = useCart();

  const handleBuyNow = async () => {
    try {
      await buyProduct(tenantID, userID, product);
      toast.success(`Successfully purchased ${product.name}!`);
      onClose();
    } catch (error) {
      toast.error("Purchase failed. Please try again.");
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  if (!product) return null;

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{product.name}</span>
            <DialogClose />
          </DialogTitle>
          <DialogDescription>
            {product.description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <Card>
              <CardContent className="p-8">
                <div className="text-8xl text-center mb-4">
                  {product.image}
                </div>
                <div className="flex justify-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">
                    (4.8) 124 reviews
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {product.name}
              </h3>
              <p className="text-muted-foreground mb-4">
                {product.description}
              </p>
              
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-primary">
                  ₹{product.price.toLocaleString()}
                </span>
                <Badge variant="secondary" className="text-sm">
                  In Stock
                </Badge>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Key Features:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Premium quality materials</li>
                <li>• 1-year warranty included</li>
                <li>• Free shipping on orders over ₹500</li>
                <li>• 30-day return policy</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="flex space-x-3">
                <Button
                  onClick={handleBuyNow}
                  className="flex-1"
                  size="lg"
                >
                  Buy Now
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
              
              <Button
                onClick={handleAddToCart}
                variant="secondary"
                className="w-full"
                size="lg"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>

            {/* Additional Info */}
            <div className="pt-4 border-t border-border">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Shipping:</span>
                  <span className="ml-2 font-medium">Free</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Delivery:</span>
                  <span className="ml-2 font-medium">2-3 days</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}








