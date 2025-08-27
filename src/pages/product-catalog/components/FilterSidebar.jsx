import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFilterChange, 
  onClearFilters,
  isMobile = false 
}) => {
  const [priceRange, setPriceRange] = useState({
    min: filters?.priceRange?.min || '',
    max: filters?.priceRange?.max || ''
  });

  const categories = [
    { id: 'electronics', label: 'Electronics', count: 156 },
    { id: 'clothing', label: 'Clothing', count: 234 },
    { id: 'home-garden', label: 'Home & Garden', count: 89 },
    { id: 'sports', label: 'Sports & Outdoors', count: 67 },
    { id: 'books', label: 'Books', count: 45 },
    { id: 'toys', label: 'Toys & Games', count: 78 },
    { id: 'beauty', label: 'Beauty & Personal Care', count: 123 },
    { id: 'automotive', label: 'Automotive', count: 34 }
  ];

  const brands = [
    { id: 'apple', label: 'Apple', count: 23 },
    { id: 'samsung', label: 'Samsung', count: 18 },
    { id: 'nike', label: 'Nike', count: 45 },
    { id: 'adidas', label: 'Adidas', count: 32 },
    { id: 'sony', label: 'Sony', count: 15 },
    { id: 'lg', label: 'LG', count: 12 },
    { id: 'hp', label: 'HP', count: 28 },
    { id: 'dell', label: 'Dell', count: 21 }
  ];

  const ratings = [
    { id: '4-plus', label: '4 Stars & Up', count: 456 },
    { id: '3-plus', label: '3 Stars & Up', count: 678 },
    { id: '2-plus', label: '2 Stars & Up', count: 789 },
    { id: '1-plus', label: '1 Star & Up', count: 890 }
  ];

  const handleCategoryChange = (categoryId, checked) => {
    const updatedCategories = checked
      ? [...(filters?.categories || []), categoryId]
      : (filters?.categories || [])?.filter(id => id !== categoryId);
    
    onFilterChange({ ...filters, categories: updatedCategories });
  };

  const handleBrandChange = (brandId, checked) => {
    const updatedBrands = checked
      ? [...(filters?.brands || []), brandId]
      : (filters?.brands || [])?.filter(id => id !== brandId);
    
    onFilterChange({ ...filters, brands: updatedBrands });
  };

  const handleRatingChange = (ratingId, checked) => {
    const updatedRatings = checked
      ? [...(filters?.ratings || []), ratingId]
      : (filters?.ratings || [])?.filter(id => id !== ratingId);
    
    onFilterChange({ ...filters, ratings: updatedRatings });
  };

  const handlePriceRangeChange = () => {
    onFilterChange({ 
      ...filters, 
      priceRange: {
        min: priceRange?.min ? parseFloat(priceRange?.min) : null,
        max: priceRange?.max ? parseFloat(priceRange?.max) : null
      }
    });
  };

  const FilterSection = ({ title, children, defaultOpen = true }) => {
    const [isExpanded, setIsExpanded] = useState(defaultOpen);

    return (
      <div className="border-b border-border pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <h3 className="font-medium text-foreground">{title}</h3>
          <Icon
            name={isExpanded ? "ChevronUp" : "ChevronDown"}
            size={16}
            className="text-muted-foreground"
          />
        </button>
        {isExpanded && children}
      </div>
    );
  };

  const sidebarContent = (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Filters</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          )}
        </div>
      </div>

      {/* Filter Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Price Range */}
        <FilterSection title="Price Range">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={priceRange?.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: e?.target?.value })}
                onBlur={handlePriceRangeChange}
              />
              <Input
                type="number"
                placeholder="Max"
                value={priceRange?.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: e?.target?.value })}
                onBlur={handlePriceRangeChange}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Under $25', min: 0, max: 25 },
                { label: '$25 - $50', min: 25, max: 50 },
                { label: '$50 - $100', min: 50, max: 100 },
                { label: 'Over $100', min: 100, max: null }
              ]?.map((range) => (
                <Button
                  key={range?.label}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setPriceRange({ min: range?.min, max: range?.max || '' });
                    onFilterChange({ 
                      ...filters, 
                      priceRange: { min: range?.min, max: range?.max }
                    });
                  }}
                  className="text-xs"
                >
                  {range?.label}
                </Button>
              ))}
            </div>
          </div>
        </FilterSection>

        {/* Categories */}
        <FilterSection title="Categories">
          <div className="space-y-2">
            {categories?.map((category) => (
              <div key={category?.id} className="flex items-center justify-between">
                <Checkbox
                  label={category?.label}
                  checked={(filters?.categories || [])?.includes(category?.id)}
                  onChange={(e) => handleCategoryChange(category?.id, e?.target?.checked)}
                />
                <span className="text-sm text-muted-foreground">({category?.count})</span>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Brands */}
        <FilterSection title="Brands">
          <div className="space-y-2">
            {brands?.map((brand) => (
              <div key={brand?.id} className="flex items-center justify-between">
                <Checkbox
                  label={brand?.label}
                  checked={(filters?.brands || [])?.includes(brand?.id)}
                  onChange={(e) => handleBrandChange(brand?.id, e?.target?.checked)}
                />
                <span className="text-sm text-muted-foreground">({brand?.count})</span>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Customer Ratings */}
        <FilterSection title="Customer Ratings">
          <div className="space-y-2">
            {ratings?.map((rating) => (
              <div key={rating?.id} className="flex items-center justify-between">
                <Checkbox
                  label={rating?.label}
                  checked={(filters?.ratings || [])?.includes(rating?.id)}
                  onChange={(e) => handleRatingChange(rating?.id, e?.target?.checked)}
                />
                <span className="text-sm text-muted-foreground">({rating?.count})</span>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Availability */}
        <FilterSection title="Availability">
          <div className="space-y-2">
            <Checkbox
              label="In Stock"
              checked={filters?.inStock || false}
              onChange={(e) => onFilterChange({ ...filters, inStock: e?.target?.checked })}
            />
            <Checkbox
              label="On Sale"
              checked={filters?.onSale || false}
              onChange={(e) => onFilterChange({ ...filters, onSale: e?.target?.checked })}
            />
            <Checkbox
              label="Free Shipping"
              checked={filters?.freeShipping || false}
              onChange={(e) => onFilterChange({ ...filters, freeShipping: e?.target?.checked })}
            />
          </div>
        </FilterSection>
      </div>

      {/* Mobile Apply Button */}
      {isMobile && (
        <div className="p-4 border-t border-border">
          <Button
            onClick={onClose}
            className="w-full"
          >
            Apply Filters
          </Button>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black/50" onClick={onClose} />
            <div className="fixed bottom-0 left-0 right-0 bg-card rounded-t-lg max-h-[80vh]">
              {sidebarContent}
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop Sidebar
  return (
    <div className={`w-80 bg-card border-r border-border ${isOpen ? 'block' : 'hidden'} lg:block`}>
      {sidebarContent}
    </div>
  );
};

export default FilterSidebar;