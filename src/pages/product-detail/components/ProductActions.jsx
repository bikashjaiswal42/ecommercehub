import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProductActions = ({ 
  product, 
  selectedVariants, 
  quantity, 
  onAddToCart, 
  onAddToWishlist, 
  onShare,
  isInWishlist = false 
}) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showAddedConfirmation, setShowAddedConfirmation] = useState(false);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await onAddToCart({
        productId: product?.id,
        variants: selectedVariants,
        quantity: quantity
      });
      setShowAddedConfirmation(true);
      setTimeout(() => setShowAddedConfirmation(false), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const isOutOfStock = product?.stock === 0;
  const canAddToCart = !isOutOfStock && Object.keys(selectedVariants)?.length > 0;

  return (
    <div className="space-y-4">
      {/* Add to Cart Success Message */}
      {showAddedConfirmation && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <Icon name="CheckCircle" size={20} className="text-green-600" />
          <div>
            <p className="text-green-800 font-medium">Added to cart!</p>
            <p className="text-green-600 text-sm">
              {quantity} item{quantity > 1 ? 's' : ''} added successfully
            </p>
          </div>
        </div>
      )}
      {/* Primary Actions */}
      <div className="space-y-3">
        <Button
          variant="default"
          size="lg"
          fullWidth
          onClick={handleAddToCart}
          disabled={!canAddToCart}
          loading={isAddingToCart}
          iconName="ShoppingCart"
          iconPosition="left"
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </Button>

        {!isOutOfStock && (
          <Button
            variant="outline"
            size="lg"
            fullWidth
            iconName="CreditCard"
            iconPosition="left"
          >
            Buy Now
          </Button>
        )}
      </div>
      {/* Secondary Actions */}
      <div className="flex space-x-3">
        <Button
          variant="ghost"
          size="lg"
          onClick={onAddToWishlist}
          className="flex-1"
          iconName={isInWishlist ? "Heart" : "Heart"}
          iconPosition="left"
        >
          <Icon 
            name="Heart" 
            size={18} 
            className={`mr-2 ${isInWishlist ? 'fill-current text-red-500' : ''}`} 
          />
          {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onShare}
          className="w-12 h-12"
        >
          <Icon name="Share2" size={18} />
        </Button>
      </div>
      {/* Stock Warning */}
      {product?.stock > 0 && product?.stock <= 5 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-center space-x-2">
          <Icon name="AlertTriangle" size={16} className="text-orange-600" />
          <p className="text-orange-800 text-sm">
            Hurry! Only {product?.stock} left in stock
          </p>
        </div>
      )}
      {/* Variant Selection Warning */}
      {Object.keys(selectedVariants)?.length === 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center space-x-2">
          <Icon name="Info" size={16} className="text-blue-600" />
          <p className="text-blue-800 text-sm">
            Please select all product options above
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductActions;