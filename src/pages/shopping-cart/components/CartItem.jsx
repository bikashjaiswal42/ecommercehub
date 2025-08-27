import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CartItem = ({ item, onUpdateQuantity, onRemoveItem, onSaveForLater }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1 || newQuantity > item?.maxStock) return;
    
    setIsUpdating(true);
    await onUpdateQuantity(item?.id, newQuantity);
    setIsUpdating(false);
  };

  const handleRemove = () => {
    onRemoveItem(item?.id);
    setShowRemoveConfirm(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-4 relative">
      {/* Stock Status Badge */}
      {!item?.inStock && (
        <div className="absolute top-2 right-2 bg-error text-error-foreground px-2 py-1 rounded-md text-xs font-medium">
          Out of Stock
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="w-full sm:w-24 h-32 sm:h-24 bg-muted rounded-lg overflow-hidden">
            <Image
              src={item?.image}
              alt={item?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-sm sm:text-base line-clamp-2">
                {item?.name}
              </h3>
              
              {/* Variants */}
              {item?.variants && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {Object.entries(item?.variants)?.map(([key, value]) => (
                    <span key={key} className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {key}: {value}
                    </span>
                  ))}
                </div>
              )}

              {/* Delivery Info */}
              {item?.estimatedDelivery && (
                <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                  <Icon name="Truck" size={14} />
                  <span>Delivery by {item?.estimatedDelivery}</span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="text-right">
              <div className="font-semibold text-foreground">
                {formatPrice(item?.price)}
              </div>
              {item?.originalPrice && item?.originalPrice > item?.price && (
                <div className="text-xs text-muted-foreground line-through">
                  {formatPrice(item?.originalPrice)}
                </div>
              )}
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="flex items-center justify-between mt-4">
            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(item?.quantity - 1)}
                disabled={isUpdating || item?.quantity <= 1 || !item?.inStock}
                className="h-8 w-8"
              >
                <Icon name="Minus" size={14} />
              </Button>
              
              <span className="min-w-[2rem] text-center text-sm font-medium">
                {isUpdating ? (
                  <Icon name="Loader2" size={16} className="animate-spin" />
                ) : (
                  item?.quantity
                )}
              </span>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(item?.quantity + 1)}
                disabled={isUpdating || item?.quantity >= item?.maxStock || !item?.inStock}
                className="h-8 w-8"
              >
                <Icon name="Plus" size={14} />
              </Button>
              
              <span className="text-xs text-muted-foreground ml-2">
                {item?.maxStock} available
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSaveForLater(item?.id)}
                className="text-xs"
              >
                <Icon name="Heart" size={14} className="mr-1" />
                Save
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowRemoveConfirm(true)}
                className="text-xs text-error hover:text-error"
              >
                <Icon name="Trash2" size={14} className="mr-1" />
                Remove
              </Button>
            </div>
          </div>

          {/* Total Price */}
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-border">
            <span className="text-sm text-muted-foreground">Subtotal:</span>
            <span className="font-semibold text-foreground">
              {formatPrice(item?.price * item?.quantity)}
            </span>
          </div>
        </div>
      </div>
      {/* Remove Confirmation Modal */}
      {showRemoveConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 max-w-sm w-full">
            <h3 className="font-semibold text-foreground mb-2">Remove Item</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Are you sure you want to remove "{item?.name}" from your cart?
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowRemoveConfirm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleRemove}
                className="flex-1"
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;