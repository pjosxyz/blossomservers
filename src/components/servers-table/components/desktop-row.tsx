import { TableCell, TableRow } from "@/components/ui/table";
import { getTagValue } from "applesauce-core/helpers";
import { RowProps } from "@/components/servers-table/types";
import ServerRating from "@/components/servers-table/components/server-rating";
import { AddReview } from "@/components/add-review";
import CopyButton from "@/components/copy-button";
import OpenServerButton from "@/components/servers-table/components/open-server-button";

function DesktopServerRow({ rowBackgroundColor, server, average, reviews, url }: RowProps) {
  return (
    <TableRow className={rowBackgroundColor}>
      {/* Name */}
      <TableCell className="font-medium">{getTagValue(server, "name")}</TableCell>
      {/* Rating */}
      <TableCell>
        <div className="flex items-center gap-2">
          <ServerRating average={average} />
          <span className="">({reviews?.length})</span>
        </div>
      </TableCell>
      {/* Domain */}
      <TableCell className="flex items-center">
        <a href={url.toString()} target="_blank">
          {url.host}
        </a>
        <CopyButton data={url.toString()} variant="ghost" className="ms-2" title="Copy URL" aria-label="Copy URL" />
      </TableCell>
      {/* Description */}
      <TableCell className="truncate max-w-96">{server.content}</TableCell>
      {/* Actions */}
      <TableCell className="text-right">
        <div className="flex gap-1 justify-end">
          <OpenServerButton url={url} />
          <AddReview server={url} />
        </div>
      </TableCell>
    </TableRow>
  );
}

export default DesktopServerRow;
