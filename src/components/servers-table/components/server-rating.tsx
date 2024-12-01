import { Star } from "lucide-react";
import Rating from "react-rating";

function ServerRating({ average }: { average: number }) {
  return (
    <div>
      {/* @ts-expect-error */}
      <Rating
        initialRating={average * 5}
        fullSymbol={<Star fill="currentColor" size={18} />}
        emptySymbol={<Star size={18} />}
        start={0}
        stop={5}
        fractions={5}
        readonly
      />
    </div>
  );
}

export default ServerRating;