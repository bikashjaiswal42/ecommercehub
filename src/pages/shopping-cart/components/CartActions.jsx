import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CartActions = ({ onClearCart, onSaveAllForLater, itemCount }) => {
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClearCart = () => {
    onClearCart();
    setShowClearConfirm(false);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Button
          variant="outline"
          onClick={onSaveAllForLater}
          disabled={itemCount === 0}
          className="flex-1 sm:flex-none"
        >
          <Icon name="Heart" size={16} className="mr-2" />
          Save All for Later
        </Button>
        
        <Button
          variant="ghost"
          onClick={() => setShowClearConfirm(true)}
          disabled={itemCount === 0}
          className="flex-1 sm:flex-none text-error hover:text-error"
        >
          <Icon name="Trash2" size={16} className="mr-2" />
          Clear Cart
        </Button>
      </div>

      {/* Clear Cart Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-error/10 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={24} className="text-error" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Clear Cart</h3>
                <p className="text-sm text-muted-foreground">
                  This action cannot be undone
                </p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-6">
              Are you sure you want to remove all {itemCount} items from your cart? 
              This will permanently delete all selected products.
            </p>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowClearConfirm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleClearCart}
                className="flex-1"
              >
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartActions;