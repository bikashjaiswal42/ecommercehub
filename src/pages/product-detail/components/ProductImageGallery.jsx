import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProductImageGallery = ({ images, productName }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images?.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === images?.length - 1 ? 0 : prev + 1
    );
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative bg-gray-50 rounded-lg overflow-hidden aspect-square">
        <Image
          src={images?.[currentImageIndex]}
          alt={`${productName} - Image ${currentImageIndex + 1}`}
          className={`w-full h-full object-cover cursor-pointer transition-transform duration-300 ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
          onClick={toggleZoom}
        />
        
        {/* Navigation Arrows */}
        {images?.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white shadow-soft w-10 h-10"
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white shadow-soft w-10 h-10"
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </>
        )}

        {/* Zoom Indicator */}
        <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
          {isZoomed ? 'Click to zoom out' : 'Click to zoom in'}
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
          {currentImageIndex + 1} / {images?.length}
        </div>
      </div>
      {/* Thumbnail Navigation */}
      {images?.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images?.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentImageIndex
                  ? 'border-primary shadow-soft'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;