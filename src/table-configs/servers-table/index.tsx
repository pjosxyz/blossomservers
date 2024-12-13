import { ServerData } from "@/types";

// dummy data
import mData from "../servers-table/MOCK_DATA.json";

import { ColumnDef } from "@tanstack/react-table";
import ServerDetail from "@/components/servers-table/components/server-detail";
import StarRating from "@/components/star-rating";
import Reviewers from "@/components/servers-table/components/reviewers";
import CopyURLButton from "@/components/servers-table/components/copy-url-button";
import ActionButtons from "@/components/servers-table/components/action-buttons";

export const serverData: ServerData[] = mData;

/**
 * Any components passed here will only show in the desktop table
 * (mobile table needs to be updated separately)
 */
export const serverColumns: ColumnDef<ServerData>[] = [
  {
    accessorKey: "serverDetail",
    header: "Server Name",
    cell: ({ row }) => {
      const { serverName, isPaidServer, hasWhitelist } = row.original.serverDetail;
      return <ServerDetail serverName={serverName} hasWhitelist={hasWhitelist} isPaidServer={isPaidServer} />;
    },
    filterFn: (row, _columnId, filterValue: string) => {
      return row.original.serverDetail.serverName.toLowerCase().includes(filterValue.toLowerCase());
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: (info) => {
      const reviewedBy = info.row.original.reviewedBy;
      const numReviews = reviewedBy.length;
      return (
        <>
          <StarRating serverRating={info.getValue<number>()} />
          <span className="text-sm">
            {numReviews} review
            {numReviews > 1 || numReviews === 0 ? "s" : ""}
          </span>
        </>
      );
    },
    filterFn: (row, _columnId, filterValue: number) => {
      return row.original.rating >= filterValue;
    },
  },
  {
    accessorKey: "reviewedBy",
    header: "Reviewed by",
    cell: ({ row }) => {
      const reviewedBy = row.original.reviewedBy;
      return (
        <div>
          <Reviewers reviewedBy={reviewedBy} />
          <span>({reviewedBy.length})</span>
        </div>
      );
    },
    filterFn: (row, _columnId, filterValue: number) => {
      return row.original.reviewedBy.length >= filterValue;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "url",
    header: "URL",
    cell: (info) => <CopyURLButton url={info.getValue<string>()} />,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const url = row.original.url;
      return <ActionButtons url={url} />;
    },
  },
];
