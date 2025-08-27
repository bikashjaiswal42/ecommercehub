import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendedItems = ({ onAddToCart }) => {
  const navigate = useNavigate();

  const recommendedProducts = [
    {
      id: 'rec-1',
      name: 'Wireless Bluetooth Headphones',
      price: 79.99,
      originalPrice: 99.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      rating: 4.5,
      reviews: 1250,
      badge: 'Best Seller'
    },
    {
      id: 'rec-2',
      name: 'Smart Fitness Watch',
      price: 199.99,
      originalPrice: 249.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
      rating: 4.7,
      reviews: 890,
      badge: 'Popular'
    },
    {
      id: 'rec-3',
      name: 'Portable Phone Charger',
      price: 29.99,
      originalPrice: 39.99,
      image: 'https://images.unsplash.com/photo-1609592806596-4d3c7e7c7c7c?w=300&h=300&fit=crop',
      rating: 4.3,
      reviews: 567,
      badge: 'New'
    },
    {
      id: 'rec-4',
      name: 'USB-C Cable 6ft',
      price: 14.99,
      originalPrice: 19.99,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
      rating: 4.6,
      reviews: 2340,
      badge: 'Essential'
    }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={12} className="text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="Star" size={12} className="text-yellow-400 fill-current opacity-50" />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={12} className="text-gray-300" />
      );
    }

    return stars;
  };

  const handleAddToCart = (product) => {
    onAddToCart({
      id: product?.id,
      name: product?.name,
      price: product?.price,
      image: product?.image,
      quantity: 1,
      maxStock: 10,
      inStock: true,
      variants: null,
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)?.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
    });
  };

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Recommended for You
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/product-catalog?recommended=true')}
        >
          View All
          <Icon name="ArrowRight" size={16} className="ml-1" />
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {recommendedProducts?.map((product) => (
          <div key={product?.id} className="bg-card border border-border rounded-lg p-4 group hover:shadow-elevated transition-smooth">
            {/* Product Badge */}
            {product?.badge && (
              <div className="mb-2">
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-md ${
                  product?.badge === 'Best Seller' ? 'bg-success text-success-foreground' :
                  product?.badge === 'Popular' ? 'bg-primary text-primary-foreground' :
                  product?.badge === 'New' ? 'bg-accent text-accent-foreground' :
                  'bg-secondary text-secondary-foreground'
                }`}>
                  {product?.badge}
                </span>
              </div>
            )}

            {/* Product Image */}
            <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-3 cursor-pointer"
                 onClick={() => navigate(`/product-detail?id=${product?.id}`)}>
              <Image
                src={product?.image}
                alt={product?.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-2">
              <h3 className="font-medium text-foreground text-sm line-clamp-2 cursor-pointer hover:text-primary transition-smooth"
                  onClick={() => navigate(`/product-detail?id=${product?.id}`)}>
                {product?.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {renderStars(product?.rating)}
                </div>
                <span className="text-xs text-muted-foreground">
                  ({product?.reviews?.toLocaleString()})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">
                  {formatPrice(product?.price)}
                </span>
                {product?.originalPrice && (
                  <span className="text-xs text-muted-foreground line-through">
                    {formatPrice(product?.originalPrice)}
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <Button
                size="sm"
                onClick={() => handleAddToCart(product)}
                className="w-full mt-3"
              >
                <Icon name="Plus" size={14} className="mr-1" />
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedItems;