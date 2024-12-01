import useCheckMobile from "@/hooks/use-check-mobile";
import { Star, SquareArrowOutUpRight } from "lucide-react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { getEventUID, getTagValue } from "applesauce-core/helpers";
import { NostrEvent } from "nostr-tools";
import { ReactNode, useMemo } from "react";
import { useStoreQuery } from "applesauce-react/hooks";
import { TimelineQuery } from "applesauce-core/queries";
import { SERVER_REVIEW_KIND } from "@/const";
import CopyButton from "./copy-button";
import { Button } from "./ui/button";
import { AddReview } from "./add-review";
import { cn } from "@/lib/utils";
import Rating from "react-rating";

type Servers =
  | {
      kind: number;
      tags: string[][];
      content: string;
      created_at: number;
      pubkey: string;
      id: string;
      sig: string;
    }[]
  | undefined;

function ServersTable({ servers }: { servers: Servers }) {
  const isMobile = useCheckMobile();

  return (
    <Table>
      <TableCaption>A list blossom servers</TableCaption>
      {!isMobile && (
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Domain</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
      )}
      <TableBody>
        {servers?.map((server, index) => (
          <ServerRow
            key={getEventUID(server)}
            server={server}
            isMobile={isMobile}
            rowBackgroundColor={index % 2 === 0 ? "bg-neutral-100" : ""}
          />
        ))}
      </TableBody>
    </Table>
  );
}

type ServerRowProps = { server: NostrEvent; isMobile: boolean; rowBackgroundColor: string };

function ServerRow({ server, isMobile, rowBackgroundColor }: ServerRowProps) {
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

  return isMobile ? (
    <MobileServerRow
      average={average}
      rowBackgroundColor={rowBackgroundColor}
      server={server}
      url={url}
      reviews={reviews}
    />
  ) : (
    <DesktopServerRow
      average={average}
      rowBackgroundColor={rowBackgroundColor}
      server={server}
      url={url}
      reviews={reviews}
    />
  );
}

type RowProps = {
  rowBackgroundColor: string;
  server: NostrEvent;
  average: number;
  reviews?: NostrEvent[];
  url: string;
};

function DesktopServerRow({ rowBackgroundColor, server, average, reviews, url }: RowProps) {
  return (
    <TableRow className={rowBackgroundColor}>
      <TableCell className="font-medium">{getTagValue(server, "name")}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <ServerRating average={average} />
          <span className="">({reviews?.length})</span>
        </div>
      </TableCell>
      <TableCell className="flex items-center">
        <a href={url} target="_blank">
          {url}
        </a>
        <CopyButton data={url} variant="ghost" className="ms-2" title="Copy URL" aria-label="Copy URL" />
      </TableCell>
      <TableCell className="text-right">
        <div className="flex gap-1 justify-end">
          <ViewServerButton url={url} />
          <AddReview server={server} />
        </div>
      </TableCell>
    </TableRow>
  );
}

function MobileServerRow({ rowBackgroundColor, server, average, reviews, url }: RowProps) {
  return (
    <>
      {/* Name */}
      <MobileTableRow rowBackgroundColor={rowBackgroundColor} dataLabel="Name">
        {getTagValue(server, "name")}
      </MobileTableRow>
      {/* Rating */}
      <MobileTableRow rowBackgroundColor={rowBackgroundColor} dataLabel="Rating">
        <div className="flex items-center gap-2">
          <ServerRating average={average} />
          <span className="text-lg">({reviews?.length})</span>
        </div>
      </MobileTableRow>
      {/* Domain */}
      <MobileTableRow rowBackgroundColor={rowBackgroundColor} dataLabel="Domain" cellClassName="flex items-center">
        <a href={url} target="_blank">
          {url}
        </a>
        <CopyButton data={url} variant="ghost" className="ms-2" title="Copy URL" aria-label="Copy URL" />
      </MobileTableRow>
      {/* Actions */}
      <MobileTableRow
        rowBackgroundColor={`${rowBackgroundColor} border-b-2 border-neutral-300`}
        dataLabel="Actions"
        cellClassName="text-right gap-2 flex-col sm:flex-row justify-end"
      >
        <ViewServerButton url={url} />
        <AddReview server={server} />
      </MobileTableRow>
    </>
  );
}

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

function ViewServerButton({ url }: { url: string }) {
  return (
    <Button variant="outline" onClick={() => window.open(url, "_blank")} className="self-end">
      View Server <SquareArrowOutUpRight size={16} />
    </Button>
  );
}

type MobileTableRowProps = {
  rowBackgroundColor: string;
  dataLabel: string;
  cellClassName?: string;
  children: ReactNode;
};

function MobileTableRow({ rowBackgroundColor, dataLabel, cellClassName, children }: MobileTableRowProps) {
  return (
    <TableRow className={rowBackgroundColor}>
      <TableCell className="text-neutral-500">{dataLabel}</TableCell>
      <TableCell className={cn(cellClassName, "flex justify-end")}>{children}</TableCell>
    </TableRow>
  );
}

export default ServersTable;
