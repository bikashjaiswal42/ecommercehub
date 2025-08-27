import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ 
  products, 
  loading, 
  onAddToWishlist, 
  onAddToCart,
  hasMore,
  onLoadMore 
}) => {
  const SkeletonCard = () => (
    <div className="bg-card rounded-lg border border-border overflow-hidden shadow-soft animate-pulse">
      <div className="aspect-square bg-muted" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-muted rounded w-1/3" />
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="flex items-center gap-1">
          <div className="h-3 bg-muted rounded w-16" />
          <div className="h-3 bg-muted rounded w-8" />
        </div>
        <div className="h-4 bg-muted rounded w-1/2" />
        <div className="h-8 bg-muted rounded" />
      </div>
    </div>
  );

  if (loading && products?.length === 0) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 20 }, (_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (products?.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-12 h-12 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0H4"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No products found</h3>
        <p className="text-muted-foreground max-w-md">
          We couldn't find any products matching your search criteria. Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products?.map((product) => (
          <ProductCard
            key={product?.id}
            product={product}
            onAddToWishlist={onAddToWishlist}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
      {/* Loading More Skeleton */}
      {loading && products?.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 10 }, (_, index) => (
            <SkeletonCard key={`loading-${index}`} />
          ))}
        </div>
      )}
      {/* Load More Button */}
      {hasMore && !loading && (
        <div className="flex justify-center pt-8">
          <button
            onClick={onLoadMore}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
          >
            Load More Products
          </button>
        </div>
      )}
      {/* End of Results */}
      {!hasMore && products?.length > 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            You've reached the end of our product catalog
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;