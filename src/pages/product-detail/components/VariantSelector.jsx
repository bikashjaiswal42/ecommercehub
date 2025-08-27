import React from 'react';
import Button from '../../../components/ui/Button';

const VariantSelector = ({ variants, selectedVariants, onVariantChange, stock }) => {
  const isVariantAvailable = (variantType, variantValue) => {
    // Check if this variant combination is available
    return stock > 0;
  };

  return (
    <div className="space-y-6">
      {Object.entries(variants)?.map(([variantType, options]) => (
        <div key={variantType}>
          <h3 className="text-sm font-semibold text-foreground mb-3 capitalize">
            {variantType}: <span className="font-normal">{selectedVariants?.[variantType]}</span>
          </h3>
          
          {variantType === 'color' ? (
            // Color swatches
            (<div className="flex flex-wrap gap-2">
              {options?.map((option) => {
                const isSelected = selectedVariants?.[variantType] === option?.value;
                const isAvailable = isVariantAvailable(variantType, option?.value);
                
                return (
                  <button
                    key={option?.value}
                    onClick={() => isAvailable && onVariantChange(variantType, option?.value)}
                    disabled={!isAvailable}
                    className={`w-10 h-10 rounded-full border-2 transition-all relative ${
                      isSelected 
                        ? 'border-primary shadow-soft scale-110' 
                        : 'border-gray-300 hover:border-gray-400'
                    } ${!isAvailable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    style={{ backgroundColor: option?.color }}
                    title={`${option?.label} ${!isAvailable ? '(Unavailable)' : ''}`}
                  >
                    {isSelected && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full shadow-soft"></div>
                      </div>
                    )}
                    {!isAvailable && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-0.5 bg-red-500 rotate-45"></div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>)
          ) : (
            // Size/other variant buttons
            (<div className="flex flex-wrap gap-2">
              {options?.map((option) => {
                const isSelected = selectedVariants?.[variantType] === option?.value;
                const isAvailable = isVariantAvailable(variantType, option?.value);
                
                return (
                  <Button
                    key={option?.value}
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    onClick={() => isAvailable && onVariantChange(variantType, option?.value)}
                    disabled={!isAvailable}
                    className={`${!isAvailable ? 'opacity-50' : ''}`}
                  >
                    {option?.label}
                    {!isAvailable && (
                      <span className="ml-1 text-xs">(N/A)</span>
                    )}
                  </Button>
                );
              })}
            </div>)
          )}
        </div>
      ))}
    </div>
  );
};

export default VariantSelector;