import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';

import Button from '../../components/ui/Button';
import FilterSidebar from './components/FilterSidebar';
import FilterChips from './components/FilterChips';
import SortDropdown from './components/SortDropdown';
import ProductGrid from './components/ProductGrid';

const ProductCatalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Filter and sort states
  const [filters, setFilters] = useState({
    categories: [],
    brands: [],
    priceRange: null,
    ratings: [],
    inStock: false,
    onSale: false,
    freeShipping: false
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      category: "electronics",
      brand: "apple",
      price: 1199.99,
      originalPrice: 1299.99,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
      rating: 4.8,
      reviewCount: 2847,
      stock: 15,
      isWishlisted: false,
      description: "The most advanced iPhone with titanium design and A17 Pro chip"
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      category: "electronics",
      brand: "samsung",
      price: 1099.99,
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
      rating: 4.7,
      reviewCount: 1923,
      stock: 8,
      isWishlisted: true,
      description: "Premium Android smartphone with S Pen and advanced camera system"
    },
    {
      id: 3,
      name: "Nike Air Max 270",
      category: "clothing",
      brand: "nike",
      price: 149.99,
      originalPrice: 179.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      rating: 4.5,
      reviewCount: 856,
      stock: 23,
      isWishlisted: false,
      description: "Comfortable running shoes with Max Air cushioning"
    },
    {
      id: 4,
      name: "Sony WH-1000XM5 Headphones",
      category: "electronics",
      brand: "sony",
      price: 349.99,
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
      rating: 4.9,
      reviewCount: 1456,
      stock: 12,
      isWishlisted: false,
      description: "Industry-leading noise canceling wireless headphones"
    },
    {
      id: 5,
      name: "Adidas Ultraboost 22",
      category: "clothing",
      brand: "adidas",
      price: 189.99,
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400",
      rating: 4.6,
      reviewCount: 734,
      stock: 0,
      isWishlisted: true,
      description: "Premium running shoes with responsive BOOST midsole"
    },
    {
      id: 6,
      name: "MacBook Pro 16-inch",
      category: "electronics",
      brand: "apple",
      price: 2399.99,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
      rating: 4.8,
      reviewCount: 923,
      stock: 5,
      isWishlisted: false,
      description: "Powerful laptop with M3 Pro chip for professional workflows"
    },
    {
      id: 7,
      name: "Smart Garden Kit",
      category: "home-garden",
      brand: "lg",
      price: 299.99,
      originalPrice: 349.99,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
      rating: 4.3,
      reviewCount: 234,
      stock: 18,
      isWishlisted: false,
      description: "Indoor hydroponic garden system for fresh herbs and vegetables"
    },
    {
      id: 8,
      name: "Gaming Mechanical Keyboard",
      category: "electronics",
      brand: "hp",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400",
      rating: 4.4,
      reviewCount: 567,
      stock: 31,
      isWishlisted: false,
      description: "RGB backlit mechanical keyboard with tactile switches"
    },
    {
      id: 9,
      name: "Wireless Charging Pad",
      category: "electronics",
      brand: "samsung",
      price: 39.99,
      originalPrice: 59.99,
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400",
      rating: 4.2,
      reviewCount: 445,
      stock: 67,
      isWishlisted: true,
      description: "Fast wireless charging pad compatible with all Qi-enabled devices"
    },
    {
      id: 10,
      name: "Fitness Tracker Watch",
      category: "sports",
      brand: "samsung",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      rating: 4.5,
      reviewCount: 1234,
      stock: 14,
      isWishlisted: false,
      description: "Advanced fitness tracking with heart rate monitoring and GPS"
    },
    {
      id: 11,
      name: "Bluetooth Speaker",
      category: "electronics",
      brand: "sony",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
      rating: 4.3,
      reviewCount: 678,
      stock: 25,
      isWishlisted: false,
      description: "Portable waterproof speaker with 360-degree sound"
    },
    {
      id: 12,
      name: "Coffee Maker Machine",
      category: "home-garden",
      brand: "hp",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
      rating: 4.6,
      reviewCount: 892,
      stock: 9,
      isWishlisted: true,
      description: "Programmable drip coffee maker with thermal carafe"
    },
    {
      id: 13,
      name: "Gaming Mouse",
      category: "electronics",
      brand: "dell",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400",
      rating: 4.4,
      reviewCount: 456,
      stock: 43,
      isWishlisted: false,
      description: "High-precision gaming mouse with customizable RGB lighting"
    },
    {
      id: 14,
      name: "Yoga Mat Premium",
      category: "sports",
      brand: "nike",
      price: 49.99,
      originalPrice: 69.99,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
      rating: 4.7,
      reviewCount: 234,
      stock: 56,
      isWishlisted: false,
      description: "Non-slip premium yoga mat with alignment lines"
    },
    {
      id: 15,
      name: "Desk Lamp LED",
      category: "home-garden",
      brand: "lg",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      rating: 4.5,
      reviewCount: 345,
      stock: 22,
      isWishlisted: false,
      description: "Adjustable LED desk lamp with USB charging port"
    },
    {
      id: 16,
      name: "Wireless Earbuds Pro",
      category: "electronics",
      brand: "apple",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400",
      rating: 4.8,
      reviewCount: 1567,
      stock: 33,
      isWishlisted: true,
      description: "Premium wireless earbuds with active noise cancellation"
    },
    {
      id: 17,
      name: "Running Shorts",
      category: "clothing",
      brand: "adidas",
      price: 34.99,
      originalPrice: 44.99,
      image: "https://images.unsplash.com/photo-1506629905607-d9c297d3f5f5?w=400",
      rating: 4.3,
      reviewCount: 123,
      stock: 78,
      isWishlisted: false,
      description: "Lightweight running shorts with moisture-wicking fabric"
    },
    {
      id: 18,
      name: "Tablet 10-inch",
      category: "electronics",
      brand: "samsung",
      price: 329.99,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
      rating: 4.4,
      reviewCount: 789,
      stock: 16,
      isWishlisted: false,
      description: "Versatile tablet perfect for work and entertainment"
    },
    {
      id: 19,
      name: "Kitchen Blender",
      category: "home-garden",
      brand: "hp",
      price: 159.99,
      originalPrice: 199.99,
      image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400",
      rating: 4.6,
      reviewCount: 456,
      stock: 11,
      isWishlisted: false,
      description: "High-performance blender for smoothies and food preparation"
    },
    {
      id: 20,
      name: "Basketball Shoes",
      category: "sports",
      brand: "nike",
      price: 119.99,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400",
      rating: 4.5,
      reviewCount: 567,
      stock: 29,
      isWishlisted: true,
      description: "High-top basketball shoes with superior ankle support"
    }
  ];

  // Initialize search query from URL params
  useEffect(() => {
    const searchFromUrl = searchParams?.get('search') || '';
    setSearchQuery(searchFromUrl);
  }, [searchParams]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load initial products
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProducts(mockProducts);
      setLoading(false);
    };

    loadProducts();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery?.trim()) {
      filtered = filtered?.filter(product =>
        product?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        product?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        product?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply category filter
    if (filters?.categories?.length > 0) {
      filtered = filtered?.filter(product =>
        filters?.categories?.includes(product?.category)
      );
    }

    // Apply brand filter
    if (filters?.brands?.length > 0) {
      filtered = filtered?.filter(product =>
        filters?.brands?.includes(product?.brand)
      );
    }

    // Apply price range filter
    if (filters?.priceRange) {
      const { min, max } = filters?.priceRange;
      filtered = filtered?.filter(product => {
        if (min && product?.price < min) return false;
        if (max && product?.price > max) return false;
        return true;
      });
    }

    // Apply rating filter
    if (filters?.ratings?.length > 0) {
      filtered = filtered?.filter(product => {
        return filters?.ratings?.some(rating => {
          switch (rating) {
            case '4-plus': return product?.rating >= 4;
            case '3-plus': return product?.rating >= 3;
            case '2-plus': return product?.rating >= 2;
            case '1-plus': return product?.rating >= 1;
            default: return true;
          }
        });
      });
    }

    // Apply availability filters
    if (filters?.inStock) {
      filtered = filtered?.filter(product => product?.stock > 0);
    }

    if (filters?.onSale) {
      filtered = filtered?.filter(product => product?.originalPrice && product?.originalPrice > product?.price);
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'price-low-high':
          return a?.price - b?.price;
        case 'price-high-low':
          return b?.price - a?.price;
        case 'rating':
          return b?.rating - a?.rating;
        case 'newest':
          return b?.id - a?.id;
        case 'popularity':
          return b?.reviewCount - a?.reviewCount;
        case 'name-a-z':
          return a?.name?.localeCompare(b?.name);
        case 'name-z-a':
          return b?.name?.localeCompare(a?.name);
        default: // relevance
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, filters, sortBy, searchQuery]);

  const handleAddToWishlist = useCallback(async (productId) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setProducts(prevProducts =>
      prevProducts?.map(product =>
        product?.id === productId
          ? { ...product, isWishlisted: !product?.isWishlisted }
          : product
      )
    );
  }, []);

  const handleAddToCart = useCallback(async (product) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Update cart count in localStorage
    const currentCount = parseInt(localStorage.getItem('cartCount') || '0');
    localStorage.setItem('cartCount', (currentCount + 1)?.toString());
    
    // Trigger a custom event to update header cart count
    window.dispatchEvent(new Event('cartUpdated'));
    
    console.log('Added to cart:', product?.name);
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      brands: [],
      priceRange: null,
      ratings: [],
      inStock: false,
      onSale: false,
      freeShipping: false
    });
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
    // In a real app, this would load more products from API
    setHasMore(false); // For demo purposes
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters?.categories?.length > 0) count += filters?.categories?.length;
    if (filters?.brands?.length > 0) count += filters?.brands?.length;
    if (filters?.priceRange) count += 1;
    if (filters?.ratings?.length > 0) count += filters?.ratings?.length;
    if (filters?.inStock) count += 1;
    if (filters?.onSale) count += 1;
    if (filters?.freeShipping) count += 1;
    return count;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="flex">
          {/* Desktop Filter Sidebar */}
          <FilterSidebar
            isOpen={isFilterSidebarOpen}
            onClose={() => setIsFilterSidebarOpen(false)}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            isMobile={false}
          />

          {/* Mobile Filter Sidebar */}
          <FilterSidebar
            isOpen={isFilterSidebarOpen}
            onClose={() => setIsFilterSidebarOpen(false)}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            isMobile={true}
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filter Button */}
            <div className="lg:hidden bg-card border-b border-border px-4 py-3">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setIsFilterSidebarOpen(true)}
                  iconName="Filter"
                  iconPosition="left"
                  iconSize={16}
                >
                  Filters
                  {getActiveFilterCount() > 0 && (
                    <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getActiveFilterCount()}
                    </span>
                  )}
                </Button>
                <span className="text-sm text-muted-foreground">
                  {filteredProducts?.length} products
                </span>
              </div>
            </div>

            {/* Filter Chips */}
            <FilterChips
              filters={filters}
              onRemoveFilter={handleFilterChange}
              onClearAll={handleClearFilters}
              totalResults={filteredProducts?.length}
            />

            {/* Sort Dropdown */}
            <SortDropdown
              currentSort={sortBy}
              onSortChange={handleSortChange}
              totalResults={filteredProducts?.length}
            />

            {/* Product Grid */}
            <div className="p-4">
              <ProductGrid
                products={filteredProducts}
                loading={loading}
                onAddToWishlist={handleAddToWishlist}
                onAddToCart={handleAddToCart}
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;