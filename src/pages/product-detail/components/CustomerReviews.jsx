import React, { useState } from 'react';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CustomerReviews = ({ reviews, averageRating, totalReviews }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const displayedReviews = showAllReviews ? reviews : reviews?.slice(0, 3);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={14} className="text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="StarHalf" size={14} className="text-yellow-400 fill-current" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-gray-300" />
      );
    }

    return stars;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews?.forEach(review => {
      distribution[Math.floor(review.rating)]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Customer Reviews</h2>
        <Button variant="outline" size="sm">
          Write a Review
        </Button>
      </div>
      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Overall Rating */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
            <span className="text-3xl font-bold text-foreground">{averageRating}</span>
            <div className="flex items-center space-x-1">
              {renderStars(averageRating)}
            </div>
          </div>
          <p className="text-muted-foreground">
            Based on {totalReviews} review{totalReviews !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1]?.map((rating) => {
            const count = ratingDistribution?.[rating];
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            
            return (
              <div key={rating} className="flex items-center space-x-2 text-sm">
                <span className="w-8 text-muted-foreground">{rating}</span>
                <Icon name="Star" size={12} className="text-yellow-400 fill-current" />
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="w-8 text-muted-foreground text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
      {/* Individual Reviews */}
      <div className="space-y-6">
        {displayedReviews?.map((review) => (
          <div key={review?.id} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
            <div className="flex items-start space-x-4">
              <Image
                src={review?.userAvatar}
                alt={review?.userName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-foreground">{review?.userName}</h4>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {renderStars(review?.rating)}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(review?.date)}
                      </span>
                    </div>
                  </div>
                  {review?.verified && (
                    <div className="flex items-center space-x-1 text-green-600 text-sm">
                      <Icon name="CheckCircle" size={14} />
                      <span>Verified Purchase</span>
                    </div>
                  )}
                </div>
                
                {review?.title && (
                  <h5 className="font-medium text-foreground mb-2">{review?.title}</h5>
                )}
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  {review?.comment}
                </p>

                {/* Review Images */}
                {review?.images && review?.images?.length > 0 && (
                  <div className="flex space-x-2 mb-3">
                    {review?.images?.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        alt={`Review image ${index + 1}`}
                        className="w-16 h-16 rounded-lg object-cover border border-border"
                      />
                    ))}
                  </div>
                )}

                {/* Helpful Actions */}
                <div className="flex items-center space-x-4 text-sm">
                  <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors">
                    <Icon name="ThumbsUp" size={14} />
                    <span>Helpful ({review?.helpfulCount})</span>
                  </button>
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Show More/Less Button */}
      {reviews?.length > 3 && (
        <div className="text-center mt-6">
          <Button
            variant="outline"
            onClick={() => setShowAllReviews(!showAllReviews)}
          >
            {showAllReviews ? 'Show Less Reviews' : `Show All ${totalReviews} Reviews`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;