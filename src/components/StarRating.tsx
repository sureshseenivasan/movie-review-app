import { useState } from "react";

interface Props {
  rating: number; // current value, 0-5 (can be a decimal for display-only mode)
  onRate?: (value: number) => void; // omit for read-only display
  size?: "sm" | "lg";
}

const StarRating = ({ rating, onRate, size = "sm" }: Props) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const interactive = Boolean(onRate);

  const displayValue = hovered ?? rating;

  const starClass = size === "lg" ? "text-3xl" : "text-lg";

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= Math.round(displayValue);

        return (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => onRate?.(star)}
            onMouseEnter={() => interactive && setHovered(star)}
            onMouseLeave={() => interactive && setHovered(null)}
            aria-label={`${star} star${star > 1 ? "s" : ""}`}
            className={`${starClass} leading-none transition ${
              interactive ? "cursor-pointer" : "cursor-default"
            } ${filled ? "text-yellow-400" : "text-gray-300"}`}
          >
            ★
          </button>
        );
      })}

      <span className="ml-2 text-sm font-semibold text-gray-600">
        {rating > 0 ? rating.toFixed(1) : "No rating"}
      </span>
    </div>
  );
};

export default StarRating;
