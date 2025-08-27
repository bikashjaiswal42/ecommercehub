import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const CheckoutHeader = () => {
  return (
    <header className="bg-card border-b border-border shadow-soft">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="ShoppingBag" size={20} color="white" />
          </div>
          <span className="text-xl font-semibold text-foreground">EcommerceHub</span>
        </Link>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Shield" size={16} />
            <span className="hidden sm:inline">Secure Checkout</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-success">
            <Icon name="Lock" size={16} />
            <span className="hidden sm:inline">SSL Protected</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CheckoutHeader;