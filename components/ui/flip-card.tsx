"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  flipped?: boolean;
  onFlip?: (flipped: boolean) => void;
}

const FlipCard = React.forwardRef<HTMLDivElement, FlipCardProps>(
  ({ className, children, flipped: flippedProp, onFlip, ...props }, ref) => {
    const [flipped, setFlipped] = React.useState(false);
    const isControlled = flippedProp !== undefined;
    const actualFlipped = isControlled ? flippedProp : flipped;

    const handleFlip = () => {
      if (isControlled) {
        onFlip?.(!flippedProp);
      } else {
        setFlipped((f) => {
          onFlip?.(!f);
          return !f;
        });
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "perspective-1000px w-full h-full cursor-pointer",
          className
        )}
        onClick={handleFlip}
        {...props}
      >
        <div
          className={cn(
            "relative w-full h-full transition-transform duration-500 transform-style-preserve-3d",
            actualFlipped ? "rotate-y-180" : ""
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);
FlipCard.displayName = "FlipCard";

const FlipCardFront = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute inset-0 w-full h-full backface-hidden", className)}
    {...props}
  />
));
FlipCardFront.displayName = "FlipCardFront";

const FlipCardBack = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute inset-0 w-full h-full backface-hidden rotate-y-180",
      className
    )}
    {...props}
  />
));
FlipCardBack.displayName = "FlipCardBack";

export { FlipCard, FlipCardFront, FlipCardBack };
