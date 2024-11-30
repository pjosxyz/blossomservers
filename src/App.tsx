import { useMemo } from "react";
import { useStoreQuery } from "applesauce-react/hooks";
import { TimelineQuery } from "applesauce-core/queries";
import { getEventUID, getTagValue } from "applesauce-core/helpers";
import { NostrEvent } from "nostr-tools";
import { Star } from "lucide-react";
import Rating from "react-rating";

import iconSrc from "./assets/icon.png";
import { SERVER_ADVERTIZEMENT_KIND, SERVER_REVIEW_KIND } from "./const";
import useSubscription from "./hooks/use-subscription";
import { AddServer } from "./components/add-server";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table";
import { AddReview } from "./components/add-review";
import { Button } from "./components/ui/button";
import CopyButton from "./components/copy-button";
import { HelpDialog } from "./components/help-dialog";

function ServerRow({ server }: { server: NostrEvent }) {
  const url = useMemo(() => new URL(getTagValue(server, "d")!).toString(), []);
  const reviews = useStoreQuery(TimelineQuery, [{ kinds: [SERVER_REVIEW_KIND], "#d": [url] }]);

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
      <TableCell className="font-medium">{getTagValue(server, "name")}</TableCell>
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
        <a href={url} target="_blank">
          {url}
        </a>
        <CopyButton data={url} variant="ghost" className="ms-2" title="Copy URL" aria-label="Copy URL" />
      </TableCell>
      <TableCell className="text-right">
        <Button variant="link" onClick={() => window.open(url, "_blank")}>
          View Server
        </Button>
        <AddReview server={server} />
      </TableCell>
    </TableRow>
  );
}

function App() {
  useSubscription("servers", { kinds: [SERVER_ADVERTIZEMENT_KIND] });
  useSubscription("reviews", { kinds: [SERVER_REVIEW_KIND] });

  const servers = useStoreQuery(TimelineQuery, [{ kinds: [SERVER_ADVERTIZEMENT_KIND] }]);

  return (
    <>
      <div className="flex gap-2 items-center p-2 w-full">
        <img src={iconSrc} className="w-16" />
        <h1 className="text-4xl">Blossom Servers</h1>

        <div className="ms-auto flex gap-2">
          <HelpDialog />
          <AddServer />
        </div>
      </div>

      <Table>
        <TableCaption>A list blossom servers</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Domain</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{servers?.map((server) => <ServerRow key={getEventUID(server)} server={server} />)}</TableBody>
      </Table>
    </>
  );
}

export default App;
