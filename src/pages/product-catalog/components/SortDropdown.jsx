import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortDropdown = ({ currentSort, onSortChange, totalResults }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Best Match', icon: 'Target' },
    { value: 'price-low-high', label: 'Price: Low to High', icon: 'TrendingUp' },
    { value: 'price-high-low', label: 'Price: High to Low', icon: 'TrendingDown' },
    { value: 'rating', label: 'Customer Rating', icon: 'Star' },
    { value: 'newest', label: 'Newest First', icon: 'Clock' },
    { value: 'popularity', label: 'Most Popular', icon: 'Heart' },
    { value: 'name-a-z', label: 'Name: A to Z', icon: 'ArrowUp' },
    { value: 'name-z-a', label: 'Name: Z to A', icon: 'ArrowDown' }
  ];

  const currentSortOption = sortOptions?.find(option => option?.value === currentSort) || sortOptions?.[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  return (
    <div className="bg-card border-b border-border px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Results Count */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Showing {totalResults?.toLocaleString()} products
          </span>
        </div>

        {/* Sort Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <Button
            variant="outline"
            onClick={() => setIsOpen(!isOpen)}
            className="min-w-[180px] justify-between"
            iconName="ChevronDown"
            iconPosition="right"
            iconSize={16}
          >
            <div className="flex items-center gap-2">
              <Icon name={currentSortOption?.icon} size={16} />
              <span className="hidden sm:inline">Sort by:</span>
              <span className="font-medium">{currentSortOption?.label}</span>
            </div>
          </Button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg shadow-elevated z-50">
              <div className="py-2">
                <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide border-b border-border">
                  Sort Options
                </div>
                {sortOptions?.map((option) => (
                  <button
                    key={option?.value}
                    onClick={() => handleSortSelect(option?.value)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-muted transition-colors duration-200 ${
                      currentSort === option?.value
                        ? 'bg-primary/10 text-primary font-medium' :'text-popover-foreground'
                    }`}
                  >
                    <Icon 
                      name={option?.icon} 
                      size={16} 
                      className={currentSort === option?.value ? 'text-primary' : 'text-muted-foreground'}
                    />
                    <span className="flex-1 text-left">{option?.label}</span>
                    {currentSort === option?.value && (
                      <Icon name="Check" size={16} className="text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SortDropdown;