import React from 'react';
import Icon from '../../../components/AppIcon';

const StepIndicator = ({ currentStep, steps }) => {
  return (
    <div className="w-full py-6 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {steps?.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const isLast = index === steps?.length - 1;
            
            return (
              <React.Fragment key={step?.id}>
                <div className="flex flex-col items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200
                    ${isCompleted 
                      ? 'bg-success border-success text-success-foreground' 
                      : isActive 
                        ? 'bg-primary border-primary text-primary-foreground' 
                        : 'bg-background border-border text-muted-foreground'
                    }
                  `}>
                    {isCompleted ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  <span className={`
                    mt-2 text-xs font-medium text-center
                    ${isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'}
                  `}>
                    {step?.title}
                  </span>
                </div>
                {!isLast && (
                  <div className={`
                    flex-1 h-0.5 mx-4 transition-all duration-200
                    ${isCompleted ? 'bg-success' : 'bg-border'}
                  `} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;