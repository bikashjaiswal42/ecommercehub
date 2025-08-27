import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const OrderSummary = ({ items, totals, isSticky = false }) => {
  const mockItems = [
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones',
      price: 79.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      color: 'Black',
      size: 'One Size'
    },
    {
      id: 2,
      name: 'Smart Fitness Watch',
      price: 199.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
      color: 'Silver',
      size: '42mm'
    },
    {
      id: 3,
      name: 'Portable Phone Charger',
      price: 29.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1609592806596-4b9c5c1b9b5e?w=300&h=300&fit=crop',
      color: 'White',
      size: '10000mAh'
    }
  ];

  const orderItems = items || mockItems;
  
  const subtotal = orderItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const orderTotals = totals || {
    subtotal,
    shipping,
    tax,
    total
  };

  return (
    <div className={`bg-card rounded-lg border border-border p-6 ${isSticky ? 'sticky top-24' : ''}`}>
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Icon name="ShoppingBag" size={20} className="mr-2" />
        Order Summary
      </h3>
      {/* Items List */}
      <div className="space-y-4 mb-6">
        {orderItems?.map((item) => (
          <div key={item?.id} className="flex items-start space-x-3">
            <div className="relative">
              <Image
                src={item?.image}
                alt={item?.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              {item?.quantity > 1 && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium">
                  {item?.quantity}
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground text-sm leading-tight">
                {item?.name}
              </h4>
              <div className="flex items-center space-x-2 mt-1">
                {item?.color && (
                  <span className="text-xs text-muted-foreground">{item?.color}</span>
                )}
                {item?.size && (
                  <>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{item?.size}</span>
                  </>
                )}
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-muted-foreground">
                  Qty: {item?.quantity}
                </span>
                <span className="font-medium text-foreground">
                  ${(item?.price * item?.quantity)?.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Promo Code */}
      <div className="border-t border-border pt-4 mb-4">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter promo code"
            className="flex-1 px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary hover:text-primary-foreground transition-colors">
            Apply
          </button>
        </div>
      </div>
      {/* Totals */}
      <div className="border-t border-border pt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-foreground">${orderTotals?.subtotal?.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-foreground">
            {orderTotals?.shipping === 0 ? 'Free' : `$${orderTotals?.shipping?.toFixed(2)}`}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span className="text-foreground">${orderTotals?.tax?.toFixed(2)}</span>
        </div>
        
        {orderTotals?.shipping === 0 && (
          <div className="flex items-center space-x-2 text-sm text-success">
            <Icon name="Truck" size={16} />
            <span>Free shipping on orders over $100</span>
          </div>
        )}
        
        <div className="border-t border-border pt-3">
          <div className="flex justify-between text-lg font-semibold">
            <span className="text-foreground">Total</span>
            <span className="text-foreground">${orderTotals?.total?.toFixed(2)}</span>
          </div>
        </div>
      </div>
      {/* Security Badges */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={14} />
            <span>SSL Secure</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Lock" size={14} />
            <span>256-bit Encryption</span>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-3 mt-3">
          <div className="px-2 py-1 bg-muted rounded text-xs font-medium">VISA</div>
          <div className="px-2 py-1 bg-muted rounded text-xs font-medium">MC</div>
          <div className="px-2 py-1 bg-muted rounded text-xs font-medium">AMEX</div>
          <div className="px-2 py-1 bg-muted rounded text-xs font-medium">PayPal</div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;