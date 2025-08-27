import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';
import EmptyCart from './components/EmptyCart';
import CartActions from './components/CartActions';
import RecommendedItems from './components/RecommendedItems';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartSummary, setCartSummary] = useState({
    subtotal: 0,
    tax: 0,
    shipping: 0,
    discount: 0,
    total: 0,
    totalItems: 0,
    promoCode: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Mock cart data
  const mockCartData = [
    {
      id: 'cart-1',
      name: 'Apple iPhone 15 Pro Max 256GB Natural Titanium',
      price: 1199.99,
      originalPrice: 1299.99,
      quantity: 1,
      maxStock: 5,
      inStock: true,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
      variants: {
        Color: 'Natural Titanium',
        Storage: '256GB'
      },
      estimatedDelivery: 'Dec 30'
    },
    {
      id: 'cart-2',
      name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
      price: 349.99,
      originalPrice: 399.99,
      quantity: 2,
      maxStock: 8,
      inStock: true,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      variants: {
        Color: 'Black'
      },
      estimatedDelivery: 'Dec 28'
    },
    {
      id: 'cart-3',
      name: 'MacBook Air 13-inch M2 Chip with 8-Core CPU',
      price: 1099.99,
      originalPrice: null,
      quantity: 1,
      maxStock: 3,
      inStock: false,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
      variants: {
        Color: 'Space Gray',
        Memory: '8GB',
        Storage: '256GB SSD'
      },
      estimatedDelivery: 'Jan 5'
    }
  ];

  useEffect(() => {
    // Simulate loading cart data
    setTimeout(() => {
      setCartItems(mockCartData);
      calculateCartSummary(mockCartData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const calculateCartSummary = (items, promoDiscount = 0, promoCode = null) => {
    const subtotal = items?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax
    const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
    const discount = subtotal * promoDiscount;
    const total = subtotal + tax + shipping - discount;
    const totalItems = items?.reduce((sum, item) => sum + item?.quantity, 0);

    setCartSummary({
      subtotal,
      tax,
      shipping,
      discount,
      total,
      totalItems,
      promoCode
    });

    // Update cart count in localStorage
    localStorage.setItem('cartCount', totalItems?.toString());
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    const updatedItems = cartItems?.map(item =>
      item?.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    calculateCartSummary(updatedItems, cartSummary?.discount / cartSummary?.subtotal, cartSummary?.promoCode);
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = cartItems?.filter(item => item?.id !== itemId);
    setCartItems(updatedItems);
    calculateCartSummary(updatedItems, cartSummary?.discount / cartSummary?.subtotal, cartSummary?.promoCode);
  };

  const handleSaveForLater = (itemId) => {
    // Simulate saving to wishlist
    const item = cartItems?.find(item => item?.id === itemId);
    if (item) {
      // Add to wishlist logic here
      handleRemoveItem(itemId);
      // Show success message
      alert(`${item?.name} has been saved to your wishlist!`);
    }
  };

  const handleSaveAllForLater = () => {
    if (cartItems?.length === 0) return;
    
    // Simulate saving all items to wishlist
    const itemCount = cartItems?.length;
    setCartItems([]);
    calculateCartSummary([]);
    alert(`All ${itemCount} items have been saved to your wishlist!`);
  };

  const handleClearCart = () => {
    setCartItems([]);
    calculateCartSummary([]);
    localStorage.setItem('cartCount', '0');
  };

  const handleApplyPromoCode = (code, discount) => {
    calculateCartSummary(cartItems, discount, code);
  };

  const handleAddToCart = (product) => {
    const existingItem = cartItems?.find(item => item?.id === product?.id);
    
    if (existingItem) {
      handleUpdateQuantity(product?.id, existingItem?.quantity + 1);
    } else {
      const updatedItems = [...cartItems, product];
      setCartItems(updatedItems);
      calculateCartSummary(updatedItems, cartSummary?.discount / cartSummary?.subtotal, cartSummary?.promoCode);
    }
    
    // Show success message
    alert(`${product?.name} has been added to your cart!`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="flex items-center gap-3">
            <Icon name="Loader2" size={24} className="animate-spin text-primary" />
            <span className="text-muted-foreground">Loading your cart...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <button onClick={() => navigate('/')} className="hover:text-primary transition-smooth">
              Home
            </button>
            <Icon name="ChevronRight" size={16} />
            <span className="text-foreground font-medium">Shopping Cart</span>
          </nav>

          {cartItems?.length === 0 ? (
            <EmptyCart />
          ) : (
            <>
              {/* Page Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                    Shopping Cart
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    {cartSummary?.totalItems} {cartSummary?.totalItems === 1 ? 'item' : 'items'} in your cart
                  </p>
                </div>

                {/* Continue Shopping Button - Desktop */}
                <Button
                  variant="outline"
                  onClick={() => navigate('/product-catalog')}
                  className="hidden sm:flex"
                >
                  <Icon name="ArrowLeft" size={16} className="mr-2" />
                  Continue Shopping
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                  {/* Cart Actions */}
                  <CartActions
                    onClearCart={handleClearCart}
                    onSaveAllForLater={handleSaveAllForLater}
                    itemCount={cartItems?.length}
                  />

                  {/* Items List */}
                  <div className="space-y-4">
                    {cartItems?.map((item) => (
                      <CartItem
                        key={item?.id}
                        item={item}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemoveItem={handleRemoveItem}
                        onSaveForLater={handleSaveForLater}
                      />
                    ))}
                  </div>

                  {/* Continue Shopping Button - Mobile */}
                  <div className="mt-6 sm:hidden">
                    <Button
                      variant="outline"
                      onClick={() => navigate('/product-catalog')}
                      className="w-full"
                    >
                      <Icon name="ArrowLeft" size={16} className="mr-2" />
                      Continue Shopping
                    </Button>
                  </div>
                </div>

                {/* Cart Summary */}
                <div className="lg:col-span-1">
                  <CartSummary
                    cartData={{
                      ...cartSummary,
                      items: cartItems
                    }}
                    onApplyPromoCode={handleApplyPromoCode}
                  />
                </div>
              </div>

              {/* Recommended Items */}
              <RecommendedItems onAddToCart={handleAddToCart} />
            </>
          )}
        </div>
      </main>
      {/* Mobile Checkout Bar */}
      {cartItems?.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 lg:hidden z-40">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="font-semibold text-foreground">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                })?.format(cartSummary?.total)}
              </p>
            </div>
            <Button
              onClick={() => navigate('/checkout')}
              size="lg"
              disabled={cartItems?.some(item => !item?.inStock)}
              className="flex-1 max-w-[200px]"
            >
              <Icon name="CreditCard" size={18} className="mr-2" />
              Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;