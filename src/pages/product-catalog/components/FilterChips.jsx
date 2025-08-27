import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChips = ({ filters, onRemoveFilter, onClearAll, totalResults }) => {
  const getActiveFilters = () => {
    const activeFilters = [];

    // Categories
    if (filters?.categories && filters?.categories?.length > 0) {
      filters?.categories?.forEach(categoryId => {
        const categoryLabels = {
          'electronics': 'Electronics',
          'clothing': 'Clothing',
          'home-garden': 'Home & Garden',
          'sports': 'Sports & Outdoors',
          'books': 'Books',
          'toys': 'Toys & Games',
          'beauty': 'Beauty & Personal Care',
          'automotive': 'Automotive'
        };
        activeFilters?.push({
          type: 'category',
          id: categoryId,
          label: categoryLabels?.[categoryId] || categoryId,
          value: categoryId
        });
      });
    }

    // Brands
    if (filters?.brands && filters?.brands?.length > 0) {
      filters?.brands?.forEach(brandId => {
        const brandLabels = {
          'apple': 'Apple',
          'samsung': 'Samsung',
          'nike': 'Nike',
          'adidas': 'Adidas',
          'sony': 'Sony',
          'lg': 'LG',
          'hp': 'HP',
          'dell': 'Dell'
        };
        activeFilters?.push({
          type: 'brand',
          id: brandId,
          label: brandLabels?.[brandId] || brandId,
          value: brandId
        });
      });
    }

    // Price Range
    if (filters?.priceRange && (filters?.priceRange?.min || filters?.priceRange?.max)) {
      const { min, max } = filters?.priceRange;
      let label = 'Price: ';
      if (min && max) {
        label += `$${min} - $${max}`;
      } else if (min) {
        label += `Over $${min}`;
      } else if (max) {
        label += `Under $${max}`;
      }
      activeFilters?.push({
        type: 'priceRange',
        id: 'priceRange',
        label,
        value: 'priceRange'
      });
    }

    // Ratings
    if (filters?.ratings && filters?.ratings?.length > 0) {
      filters?.ratings?.forEach(ratingId => {
        const ratingLabels = {
          '4-plus': '4+ Stars',
          '3-plus': '3+ Stars',
          '2-plus': '2+ Stars',
          '1-plus': '1+ Stars'
        };
        activeFilters?.push({
          type: 'rating',
          id: ratingId,
          label: ratingLabels?.[ratingId] || ratingId,
          value: ratingId
        });
      });
    }

    // Availability filters
    if (filters?.inStock) {
      activeFilters?.push({
        type: 'availability',
        id: 'inStock',
        label: 'In Stock',
        value: 'inStock'
      });
    }

    if (filters?.onSale) {
      activeFilters?.push({
        type: 'availability',
        id: 'onSale',
        label: 'On Sale',
        value: 'onSale'
      });
    }

    if (filters?.freeShipping) {
      activeFilters?.push({
        type: 'availability',
        id: 'freeShipping',
        label: 'Free Shipping',
        value: 'freeShipping'
      });
    }

    return activeFilters;
  };

  const handleRemoveFilter = (filter) => {
    const updatedFilters = { ...filters };

    switch (filter?.type) {
      case 'category':
        updatedFilters.categories = (filters?.categories || [])?.filter(id => id !== filter?.value);
        break;
      case 'brand':
        updatedFilters.brands = (filters?.brands || [])?.filter(id => id !== filter?.value);
        break;
      case 'priceRange':
        updatedFilters.priceRange = null;
        break;
      case 'rating':
        updatedFilters.ratings = (filters?.ratings || [])?.filter(id => id !== filter?.value);
        break;
      case 'availability':
        updatedFilters[filter.value] = false;
        break;
      default:
        break;
    }

    onRemoveFilter(updatedFilters);
  };

  const activeFilters = getActiveFilters();

  if (activeFilters?.length === 0) {
    return null;
  }

  return (
    <div className="bg-card border-b border-border px-4 py-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">
            {totalResults?.toLocaleString()} results
          </span>
          {activeFilters?.length > 0 && (
            <span className="text-sm text-muted-foreground">
              • {activeFilters?.length} filter{activeFilters?.length !== 1 ? 's' : ''} applied
            </span>
          )}
        </div>
        {activeFilters?.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        )}
      </div>
      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {activeFilters?.map((filter, index) => (
          <div
            key={`${filter?.type}-${filter?.id}-${index}`}
            className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
          >
            <span>{filter?.label}</span>
            <button
              onClick={() => handleRemoveFilter(filter)}
              className="ml-1 hover:bg-primary/20 rounded-full p-0.5 transition-colors duration-200"
            >
              <Icon name="X" size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterChips;