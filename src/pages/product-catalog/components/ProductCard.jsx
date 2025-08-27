import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductCard = ({ product, onAddToWishlist, onAddToCart }) => {
  const [isWishlisted, setIsWishlisted] = useState(product?.isWishlisted || false);
  const [isLoading, setIsLoading] = useState(false);

  const handleWishlistToggle = async (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsLoading(true);
    
    try {
      await onAddToWishlist(product?.id);
      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error('Failed to update wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsLoading(true);
    
    try {
      await onAddToCart(product);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name={index < Math.floor(rating) ? "Star" : "Star"}
        size={14}
        className={index < Math.floor(rating) ? "text-amber-400 fill-current" : "text-gray-300"}
      />
    ));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  return (
    <Link to={`/product-detail?id=${product?.id}`} className="group">
      <div className="bg-card rounded-lg border border-border overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 group-hover:scale-[1.02]">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product?.image}
            alt={product?.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            disabled={isLoading}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-soft hover:bg-white transition-colors duration-200 disabled:opacity-50"
          >
            <Icon
              name="Heart"
              size={16}
              className={`transition-colors duration-200 ${
                isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'
              }`}
            />
          </button>

          {/* Stock Badge */}
          {product?.stock <= 5 && product?.stock > 0 && (
            <div className="absolute top-3 left-3 bg-warning text-warning-foreground px-2 py-1 rounded-md text-xs font-medium">
              Only {product?.stock} left
            </div>
          )}

          {/* Out of Stock Badge */}
          {product?.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-error text-error-foreground px-3 py-1 rounded-md text-sm font-medium">
                Out of Stock
              </span>
            </div>
          )}

          {/* Sale Badge */}
          {product?.originalPrice && product?.originalPrice > product?.price && (
            <div className="absolute bottom-3 left-3 bg-error text-error-foreground px-2 py-1 rounded-md text-xs font-medium">
              {Math.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100)}% OFF
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            {product?.category}
          </p>

          {/* Product Name */}
          <h3 className="font-medium text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {product?.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center gap-0.5">
              {renderStars(product?.rating)}
            </div>
            <span className="text-sm text-muted-foreground ml-1">
              ({product?.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-semibold text-foreground">
              {formatPrice(product?.price)}
            </span>
            {product?.originalPrice && product?.originalPrice > product?.price && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product?.originalPrice)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={product?.stock === 0 || isLoading}
            loading={isLoading}
            variant={product?.stock === 0 ? "outline" : "default"}
            size="sm"
            className="w-full"
            iconName="ShoppingCart"
            iconPosition="left"
            iconSize={16}
          >
            {product?.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;