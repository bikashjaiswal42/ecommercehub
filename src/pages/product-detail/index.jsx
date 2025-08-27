import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import VariantSelector from './components/VariantSelector';
import QuantitySelector from './components/QuantitySelector';
import ProductActions from './components/ProductActions';
import ProductTabs from './components/ProductTabs';
import CustomerReviews from './components/CustomerReviews';
import RelatedProducts from './components/RelatedProducts';
import Breadcrumb from './components/Breadcrumb';

const ProductDetail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const productId = searchParams?.get('id') || '1';

  const [product, setProduct] = useState(null);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock product data
  const mockProduct = {
    id: productId,
    name: "Premium Wireless Bluetooth Headphones",
    brand: "AudioTech Pro",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.5,
    reviewCount: 1247,
    stock: 15,
    freeShipping: true,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop"
    ],
    keyFeatures: [
      "Active Noise Cancellation Technology",
      "40-hour battery life with quick charge",
      "Premium leather ear cushions",
      "Bluetooth 5.0 connectivity",
      "Built-in microphone for calls"
    ],
    description: `Experience premium audio quality with our flagship wireless headphones. Featuring advanced active noise cancellation technology, these headphones deliver crystal-clear sound while blocking out unwanted ambient noise.\n\nThe ergonomic design ensures comfortable all-day wear, while the premium materials provide durability and style. With up to 40 hours of battery life, you can enjoy uninterrupted music, calls, and entertainment.\n\nPerfect for professionals, audiophiles, and anyone who demands the best in wireless audio technology.`,
    features: [
      "Advanced 40mm drivers for superior sound quality",
      "Touch controls for easy music and call management",
      "Foldable design for easy portability",
      "Compatible with all Bluetooth-enabled devices",
      "Includes premium carrying case and charging cable"
    ],
    specifications: {
      driverSize: "40mm",
      frequency: "20Hz - 20kHz",
      impedance: "32 Ohm",
      batteryLife: "40 hours",
      chargingTime: "2 hours",
      bluetoothVersion: "5.0",
      weight: "280g",
      warranty: "2 years"
    },
    variants: {
      color: [
        { value: "black", label: "Midnight Black", color: "#000000" },
        { value: "white", label: "Pearl White", color: "#FFFFFF" },
        { value: "blue", label: "Ocean Blue", color: "#1E40AF" },
        { value: "red", label: "Crimson Red", color: "#DC2626" }
      ],
      size: [
        { value: "standard", label: "Standard" },
        { value: "large", label: "Large" }
      ]
    }
  };

  const mockReviews = [
    {
      id: 1,
      userName: "Sarah Johnson",
      userAvatar: "https://randomuser.me/api/portraits/women/1.jpg",
      rating: 5,
      title: "Exceptional sound quality!",
      comment: "These headphones exceeded my expectations. The noise cancellation is incredible and the battery life is exactly as advertised. Perfect for my daily commute and work from home setup.",
      date: "2025-08-20",
      verified: true,
      helpfulCount: 23,
      images: []
    },
    {
      id: 2,
      userName: "Michael Chen",
      userAvatar: "https://randomuser.me/api/portraits/men/2.jpg",
      rating: 4,
      title: "Great value for money",
      comment: "Really impressed with the build quality and comfort. The only minor issue is that they can get a bit warm during extended use, but overall fantastic headphones.",
      date: "2025-08-15",
      verified: true,
      helpfulCount: 18,
      images: []
    },
    {
      id: 3,
      userName: "Emily Rodriguez",
      userAvatar: "https://randomuser.me/api/portraits/women/3.jpg",
      rating: 5,
      title: "Perfect for work calls",
      comment: "The microphone quality is outstanding for video calls. My colleagues always comment on how clear I sound. The noise cancellation helps me focus in a busy office environment.",
      date: "2025-08-10",
      verified: true,
      helpfulCount: 31,
      images: []
    }
  ];

  const mockRelatedProducts = [
    {
      id: "2",
      name: "Wireless Earbuds Pro",
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=300&fit=crop",
      price: 129.99,
      originalPrice: 159.99,
      rating: 4.3,
      reviewCount: 892
    },
    {
      id: "3",
      name: "Gaming Headset RGB",
      image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=300&h=300&fit=crop",
      price: 89.99,
      rating: 4.1,
      reviewCount: 456
    },
    {
      id: "4",
      name: "Studio Monitor Headphones",
      image: "https://images.unsplash.com/photo-1558756520-22cfe5d382ca?w=300&h=300&fit=crop",
      price: 299.99,
      originalPrice: 349.99,
      rating: 4.7,
      reviewCount: 234
    },
    {
      id: "5",
      name: "Portable Speaker Bluetooth",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
      price: 79.99,
      rating: 4.4,
      reviewCount: 678
    }
  ];

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Electronics", href: "/product-catalog?category=electronics" },
    { label: "Audio", href: "/product-catalog?category=audio" },
    { label: "Headphones", href: "/product-catalog?category=headphones" },
    { label: mockProduct?.name }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setProduct(mockProduct);
      setSelectedVariants({
        color: mockProduct?.variants?.color?.[0]?.value,
        size: mockProduct?.variants?.size?.[0]?.value
      });
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [productId]);

  useEffect(() => {
    // Check if product is in wishlist
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsInWishlist(wishlist?.includes(productId));
  }, [productId]);

  const handleVariantChange = (variantType, value) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantType]: value
    }));
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = async (cartItem) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update cart in localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = existingCart?.findIndex(
      item => item?.productId === cartItem?.productId && 
      JSON.stringify(item?.variants) === JSON.stringify(cartItem?.variants)
    );

    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += cartItem?.quantity;
    } else {
      existingCart?.push({
        ...cartItem,
        productName: product?.name,
        productImage: product?.images?.[0],
        price: product?.price,
        addedAt: new Date()?.toISOString()
      });
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Update cart count
    const totalItems = existingCart?.reduce((sum, item) => sum + item?.quantity, 0);
    localStorage.setItem('cartCount', totalItems?.toString());
    
    // Trigger cart update event
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleAddToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (isInWishlist) {
      const updatedWishlist = wishlist?.filter(id => id !== productId);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setIsInWishlist(false);
    } else {
      wishlist?.push(productId);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setIsInWishlist(true);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          text: `Check out this amazing product: ${product?.name}`,
          url: window.location?.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard?.writeText(window.location?.href);
      alert('Product link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="animate-pulse">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="aspect-square bg-gray-200 rounded-lg"></div>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4]?.map(i => (
                      <div key={i} className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-12 bg-gray-200 rounded w-1/3"></div>
                  <div className="space-y-2">
                    {[1, 2, 3]?.map(i => (
                      <div key={i} className="h-4 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => navigate('/product-catalog')}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          {/* Main Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Product Images */}
            <div>
              <ProductImageGallery 
                images={product?.images} 
                productName={product?.name} 
              />
            </div>

            {/* Product Details */}
            <div className="space-y-8">
              <ProductInfo product={product} />
              
              <VariantSelector
                variants={product?.variants}
                selectedVariants={selectedVariants}
                onVariantChange={handleVariantChange}
                stock={product?.stock}
              />
              
              <QuantitySelector
                quantity={quantity}
                onQuantityChange={handleQuantityChange}
                maxQuantity={Math.min(product?.stock, 10)}
                disabled={product?.stock === 0}
              />
              
              <ProductActions
                product={product}
                selectedVariants={selectedVariants}
                quantity={quantity}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                onShare={handleShare}
                isInWishlist={isInWishlist}
              />
            </div>
          </div>

          {/* Product Information Tabs */}
          <div className="mb-12">
            <ProductTabs product={product} />
          </div>

          {/* Customer Reviews */}
          <div className="mb-12">
            <CustomerReviews
              reviews={mockReviews}
              averageRating={product?.rating}
              totalReviews={product?.reviewCount}
            />
          </div>

          {/* Related Products */}
          <div>
            <RelatedProducts products={mockRelatedProducts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;