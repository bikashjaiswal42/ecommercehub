import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductInfo = ({ product }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="StarHalf" size={16} className="text-yellow-400 fill-current" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={16} className="text-gray-300" />
      );
    }

    return stars;
  };

  const getStockStatus = (stock) => {
    if (stock === 0) {
      return { text: 'Out of Stock', color: 'text-red-600', bgColor: 'bg-red-50' };
    } else if (stock <= 5) {
      return { text: `Only ${stock} left`, color: 'text-orange-600', bgColor: 'bg-orange-50' };
    } else {
      return { text: 'In Stock', color: 'text-green-600', bgColor: 'bg-green-50' };
    }
  };

  const stockStatus = getStockStatus(product?.stock);

  return (
    <div className="space-y-6">
      {/* Product Title */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
          {product?.name}
        </h1>
        <p className="text-muted-foreground">{product?.brand}</p>
      </div>
      {/* Price */}
      <div className="flex items-center space-x-3">
        <span className="text-3xl font-bold text-foreground">
          ${product?.price?.toFixed(2)}
        </span>
        {product?.originalPrice && product?.originalPrice > product?.price && (
          <>
            <span className="text-xl text-muted-foreground line-through">
              ${product?.originalPrice?.toFixed(2)}
            </span>
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
              {Math.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100)}% OFF
            </span>
          </>
        )}
      </div>
      {/* Rating and Reviews */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          {renderStars(product?.rating)}
          <span className="text-sm font-medium text-foreground ml-1">
            {product?.rating}
          </span>
        </div>
        <Button variant="link" className="p-0 h-auto text-sm text-primary">
          ({product?.reviewCount} reviews)
        </Button>
      </div>
      {/* Stock Status */}
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${stockStatus?.bgColor} ${stockStatus?.color}`}>
        <Icon 
          name={product?.stock === 0 ? "XCircle" : product?.stock <= 5 ? "AlertTriangle" : "CheckCircle"} 
          size={16} 
          className="mr-2" 
        />
        {stockStatus?.text}
      </div>
      {/* Key Features */}
      {product?.keyFeatures && product?.keyFeatures?.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Key Features</h3>
          <ul className="space-y-2">
            {product?.keyFeatures?.map((feature, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Icon name="Check" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Free Shipping Badge */}
      {product?.freeShipping && (
        <div className="flex items-center space-x-2 text-green-600">
          <Icon name="Truck" size={16} />
          <span className="text-sm font-medium">Free Shipping Available</span>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;