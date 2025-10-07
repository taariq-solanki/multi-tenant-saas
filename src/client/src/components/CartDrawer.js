import React from "react";
import { motion } from "framer-motion";
import { useCart } from "../contexts/CartContext";
import { buyProduct } from "../api";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "./ui/sheet";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  CreditCard,
  X
} from "lucide-react";
import toast from "react-hot-toast";

export default function CartDrawer({ tenantID, userID }) {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCart();

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    try {
      // Process each item in the cart
      for (const item of cartItems) {
        for (let i = 0; i < item.quantity; i++) {
          await buyProduct(tenantID, userID, {
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            description: item.description,
          });
        }
      }
      
      toast.success(`Successfully purchased ${getTotalItems()} items!`);
      clearCart();
      setIsCartOpen(false);
    } catch (error) {
      toast.error("Checkout failed. Please try again.");
    }
  };

  return (
    <Sheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5" />
            <span>Shopping Cart</span>
            {getTotalItems() > 0 && (
              <Badge variant="secondary">{getTotalItems()}</Badge>
            )}
          </SheetTitle>
          <SheetDescription>
            Review your items before checkout
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6">
          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center h-full text-center"
            >
              <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Your cart is empty
              </h3>
              <p className="text-muted-foreground mb-4">
                Add some products to get started
              </p>
              <Button
                onClick={() => setIsCartOpen(false)}
                className="mt-4"
              >
                Continue Shopping
              </Button>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <motion.div
                  key={`${item.id}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="text-3xl">{item.image}</div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground truncate">
                            {item.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            ₹{item.price.toLocaleString()}
                          </p>
                          
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="w-8 text-center font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-foreground">
                                ₹{(item.price * item.quantity).toLocaleString()}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-border pt-4 space-y-4"
          >
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span>₹{getTotalPrice().toLocaleString()}</span>
            </div>
            
            <div className="space-y-2">
              <Button
                onClick={handleCheckout}
                className="w-full"
                size="lg"
                className="flex items-center justify-center space-x-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Checkout ({getTotalItems()} items)</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={clearCart}
                className="w-full"
              >
                Clear Cart
              </Button>
            </div>
          </motion.div>
        )}
      </SheetContent>
    </Sheet>
  );
}








