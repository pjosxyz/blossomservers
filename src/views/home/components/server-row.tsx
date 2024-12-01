import { useMemo } from "react";
import { useStoreQuery } from "applesauce-react/hooks";
import { TimelineQuery } from "applesauce-core/queries";
import { getTagValue } from "applesauce-core/helpers";
import { NostrEvent } from "nostr-tools";
import { Link } from "react-router-dom";
import { ExternalLink, Star } from "lucide-react";
import Rating from "react-rating";

import { SERVER_REVIEW_KIND } from "../../../const";
import { TableCell, TableRow } from "../../../components/ui/table";
import { AddReviewDialog } from "../../../components/add-review";
import { Button } from "../../../components/ui/button";
import CopyButton from "../../../components/copy-button";

export default function ServerRow({ server }: { server: NostrEvent }) {
  const url = useMemo(() => new URL(getTagValue(server, "d")!), []);
  const reviews = useStoreQuery(TimelineQuery, [{ kinds: [SERVER_REVIEW_KIND], "#d": [url.toString()] }]);

  const average = useMemo(() => {
    if (!reviews) return 0;

    let total = 0;
    let count = 0;

    for (const review of reviews) {
      const ratingTag = review.tags.find((t) => t[0] === "rating" && t[1] && !t[2]);
      if (ratingTag) {
        const value = parseFloat(ratingTag[1]);
        if (!Number.isFinite(value)) continue;

        count++;
        total += value;
      }
    }

    return total / count;
  }, [reviews]);

  return (
    <TableRow>
      <TableCell className="font-medium">
        <Link to={`/server/${new URL(url).host}`} className="hover:underline">
          {getTagValue(server, "name")}
        </Link>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          {/* @ts-expect-error */}
          <Rating
            initialRating={average * 5}
            fullSymbol={<Star fill="currentColor" />}
            emptySymbol={<Star />}
            start={0}
            stop={5}
            fractions={5}
            readonly
          />
          <span className="text-lg">({reviews?.length})</span>
        </div>
      </TableCell>
      <TableCell>
        <a href={url.toString()} target="_blank" className="hover:underline">
          {url.host}
        </a>
        <CopyButton data={url.toString()} variant="ghost" className="ms-2" title="Copy URL" aria-label="Copy URL" />
      </TableCell>
      <TableCell className="truncate max-w-96">{server.content}</TableCell>
      <TableCell className="text-right">
        <Button variant="link" onClick={() => window.open(url, "_blank")}>
          Open <ExternalLink size="1.2em" />
        </Button>
        <AddReviewDialog server={url} />
      </TableCell>
    </TableRow>
  );
}
