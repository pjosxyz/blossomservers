import { useContext } from "react";
import { ServersTableContext, ServersTableContextType } from "../context/servers-table-context";

export function useTable(): ServersTableContextType {
  const context = useContext(ServersTableContext);
  if (context === null) {
    throw new Error("useTable must be used within a TableProvider");
  }
  return context;
}
