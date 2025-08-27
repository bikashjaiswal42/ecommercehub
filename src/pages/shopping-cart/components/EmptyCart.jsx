import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Empty Cart Illustration */}
      <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon name="ShoppingCart" size={48} className="text-muted-foreground" />
      </div>
      {/* Empty State Content */}
      <h2 className="text-2xl font-semibold text-foreground mb-2">
        Your cart is empty
      </h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Looks like you haven't added any items to your cart yet. 
        Start shopping to fill it up with amazing products!
      </p>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={() => navigate('/product-catalog')}
          size="lg"
          className="min-w-[200px]"
        >
          <Icon name="Search" size={18} className="mr-2" />
          Continue Shopping
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          onClick={() => navigate('/product-catalog?featured=true')}
          className="min-w-[200px]"
        >
          <Icon name="Star" size={18} className="mr-2" />
          View Featured Items
        </Button>
      </div>
      {/* Popular Categories */}
      <div className="mt-12 w-full max-w-2xl">
        <h3 className="text-lg font-medium text-foreground mb-4">
          Popular Categories
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { name: 'Electronics', icon: 'Smartphone', path: '/product-catalog?category=electronics' },
            { name: 'Fashion', icon: 'Shirt', path: '/product-catalog?category=fashion' },
            { name: 'Home & Garden', icon: 'Home', path: '/product-catalog?category=home' },
            { name: 'Sports', icon: 'Dumbbell', path: '/product-catalog?category=sports' }
          ]?.map((category) => (
            <button
              key={category?.name}
              onClick={() => navigate(category?.path)}
              className="p-4 bg-card border border-border rounded-lg hover:border-primary transition-smooth group"
            >
              <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                <Icon name={category?.icon} size={24} />
              </div>
              <span className="text-sm font-medium text-foreground">
                {category?.name}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Recently Viewed */}
      <div className="mt-8 p-4 bg-muted rounded-lg">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>
            Check your recently viewed items or browse our recommendations
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;