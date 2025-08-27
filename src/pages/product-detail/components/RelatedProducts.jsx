import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const RelatedProducts = ({ products }) => {
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
        <Icon key="half" name="StarHalf" size={12} className="text-yellow-400 fill-current" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={12} className="text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">You Might Also Like</h2>
        <Link to="/product-catalog">
          <Button variant="outline" size="sm">
            View All Products
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.map((product) => (
          <Link
            key={product?.id}
            to={`/product-detail?id=${product?.id}`}
            className="group bg-background rounded-lg border border-border overflow-hidden hover:shadow-elevated transition-all duration-300"
          >
            <div className="aspect-square bg-gray-50 overflow-hidden">
              <Image
                src={product?.image}
                alt={product?.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="p-3">
              <h3 className="font-medium text-foreground text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                {product?.name}
              </h3>
              
              <div className="flex items-center space-x-1 mb-2">
                {renderStars(product?.rating)}
                <span className="text-xs text-muted-foreground">
                  ({product?.reviewCount})
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-foreground">
                    ${product?.price?.toFixed(2)}
                  </span>
                  {product?.originalPrice && product?.originalPrice > product?.price && (
                    <span className="text-xs text-muted-foreground line-through">
                      ${product?.originalPrice?.toFixed(2)}
                    </span>
                  )}
                </div>
                
                {product?.originalPrice && product?.originalPrice > product?.price && (
                  <span className="bg-red-100 text-red-800 px-1.5 py-0.5 rounded text-xs font-medium">
                    {Math.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              {/* Quick Add to Cart */}
              <Button
                variant="outline"
                size="sm"
                fullWidth
                className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={(e) => {
                  e?.preventDefault();
                  // Handle quick add to cart
                  console.log('Quick add to cart:', product?.id);
                }}
              >
                <Icon name="ShoppingCart" size={14} className="mr-2" />
                Quick Add
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;