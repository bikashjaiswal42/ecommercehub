import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuantitySelector = ({ quantity, onQuantityChange, maxQuantity = 10, disabled = false }) => {
  const handleDecrease = () => {
    if (quantity > 1 && !disabled) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxQuantity && !disabled) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e?.target?.value);
    if (!isNaN(value) && value >= 1 && value <= maxQuantity && !disabled) {
      onQuantityChange(value);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-foreground">Quantity</label>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleDecrease}
          disabled={quantity <= 1 || disabled}
          className="w-10 h-10"
        >
          <Icon name="Minus" size={16} />
        </Button>
        
        <input
          type="number"
          min="1"
          max={maxQuantity}
          value={quantity}
          onChange={handleInputChange}
          disabled={disabled}
          className="w-16 h-10 text-center border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
        />
        
        <Button
          variant="outline"
          size="icon"
          onClick={handleIncrease}
          disabled={quantity >= maxQuantity || disabled}
          className="w-10 h-10"
        >
          <Icon name="Plus" size={16} />
        </Button>
      </div>
      
      {maxQuantity < 10 && (
        <p className="text-xs text-muted-foreground">
          Maximum {maxQuantity} items available
        </p>
      )}
    </div>
  );
};

export default QuantitySelector;