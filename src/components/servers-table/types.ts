import { NostrEvent } from "nostr-tools";
import { ReactNode } from "react";

export type Servers =
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

export type ServerRowProps = { server: NostrEvent; isMobile: boolean; rowBackgroundColor: string };

export type RowProps = {
  rowBackgroundColor: string;
  server: NostrEvent;
  average: number;
  reviews?: NostrEvent[];
  url: URL;
};

export type MobileTableRowProps = {
  rowBackgroundColor: string;
  dataLabel: string;
  cellClassName?: string;
  children: ReactNode;
};

