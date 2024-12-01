import { getTagValue } from "applesauce-core/helpers";
import ServerRating from "@/components/servers-table/components//server-rating";
import CopyButton from "@/components/copy-button";
import OpenServerButton from "@/components/servers-table/components/open-server-button";
import { AddReview } from "@/components/add-review";
import { RowProps } from "@/components/servers-table/types";
import MobileTableRow from "@/components/servers-table/components/mobile-table-row";

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
        <a href={url.toString()} target="_blank">
          {url.host}
        </a>
        <CopyButton data={url.toString()} variant="ghost" className="ms-2" title="Copy URL" aria-label="Copy URL" />
      </MobileTableRow>
      {/* Description */}
      <MobileTableRow rowBackgroundColor={rowBackgroundColor} dataLabel="Description">
        {server.content}
      </MobileTableRow>
      {/* Actions */}
      <MobileTableRow
        rowBackgroundColor={`${rowBackgroundColor} border-b-2 border-neutral-300`}
        dataLabel="Actions"
        cellClassName="text-right gap-2 flex-col sm:flex-row justify-end"
      >
        <OpenServerButton url={url} />
        <AddReview server={url} />
      </MobileTableRow>
    </>
  );
}

export default MobileServerRow;