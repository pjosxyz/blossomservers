import { TableCell, TableRow } from "@/components/ui/table";
import { MobileTableRowProps } from "@/components/servers-table/types";
import { cn } from "@/lib/utils";

function MobileTableRow({ rowBackgroundColor, dataLabel, cellClassName, children }: MobileTableRowProps) {
  return (
    <TableRow className={rowBackgroundColor}>
      <TableCell className="text-neutral-500">{dataLabel}</TableCell>
      <TableCell className={cn(cellClassName, "flex justify-end")}>{children}</TableCell>
    </TableRow>
  );
}

export default MobileTableRow;
