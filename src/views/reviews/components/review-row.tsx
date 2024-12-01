import { getTagValue } from "applesauce-core/helpers";
import { Star } from "lucide-react";
import { NostrEvent } from "nostr-tools";
import { useMemo } from "react";
import Rating from "react-rating";

import { TableCell, TableRow } from "../../../components/ui/table";
import getReviewRating from "../../../helpers/review";
import { Link } from "react-router-dom";

export default function ReviewRow({ review }: { review: NostrEvent }) {
  const url = useMemo(() => new URL(getTagValue(review, "d")!), []);
  const rating = getReviewRating(review);

  return (
    <TableRow>
      <TableCell>user</TableCell>
      <TableCell>
        {rating !== null && (
          // @ts-expect-error
          <Rating
            initialRating={rating * 5}
            fullSymbol={<Star fill="currentColor" />}
            emptySymbol={<Star />}
            start={0}
            stop={5}
            fractions={5}
            readonly
          />
        )}
      </TableCell>
      <TableCell>
        <Link to={`/server/${url.host}`} className="hover:underline">
          {url.host}
        </Link>
      </TableCell>
      <TableCell>{review.content}</TableCell>
    </TableRow>
  );
}
