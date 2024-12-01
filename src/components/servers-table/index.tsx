import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useCheckMobile from "@/hooks/use-check-mobile";
import { getEventUID } from "applesauce-core/helpers";
import ServerRow from "@/components/servers-table/components/server-row";
import type { Servers } from "@/components/servers-table/types";

export function ServersTable({ servers }: { servers: Servers }) {
  const isMobile = useCheckMobile();

  return (
    // add table border
    <div className="border border-neutral-300 rounded-xl overflow-hidden">
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
    </div>
  );
}
