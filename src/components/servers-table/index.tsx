import Pagination from "@/components/servers-table/components/pagination";
import MobileTable from "./components/mobile-servers-table/mobile-table";
import { ServersTableProps } from "@/types";
import DesktopTable from "./components/desktop-servers-table/desktop-table";
import { ServersTableProvider } from "./context/servers-table-provider";

export default function ServersTable({ data, columns }: ServersTableProps) {
  return (
    // TODO: move to wrap tabs too in App
    <div className="flex flex-col h-[90dvh] pb-10 gap-4">
      <ServersTableProvider data={data} columns={columns}>
        <MobileTable />
        <DesktopTable />
        <Pagination />
      </ServersTableProvider>
    </div>
  );
}
