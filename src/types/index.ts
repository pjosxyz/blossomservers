import { ColumnDef, Table } from "@tanstack/react-table";

export type ServerData = {
  id: number;
  serverDetail: ServerDetail;
  rating: number;
  reviewedBy: ReviewedBy[];
  description: string;
  url: string;
};

export type ReviewedBy = {
  id: number;
  username: string;
  address: string;
};

export type ServerDetail = {
  serverName: string;
  isPaidServer: boolean;
  hasWhitelist: boolean;
};

export type ServersTableProps = {
  data: ServerData[];
  columns: ColumnDef<ServerData>[];
};

export type TableProps = {
  tableData: Table<ServerData>;
  serverNameFilter: string;
  onServerNameFilterChange: (value: string) => void;
  onRatingFilterChange: (value: number) => void;
  onReviewFilterChange: (value: number) => void;
  onResetReviewRatingFilters: () => void;
};

export type MobileRowProps = Omit<ServerData, "id"> & { key: number };

export type PaginationProps = {
  tableData: Table<ServerData>;
  itemsPerPage: number;
  onItemsPerPageChange: (value: string) => void;
};

export type FiltersType = {
  serverNameFilter: string;
  onSearchChange: (value: string) => void;
};


