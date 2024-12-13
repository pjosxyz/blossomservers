import { ServerDetail as ServerDetailProps } from "@/types";
import Chip from "./chip";

export default function ServerDetail({ serverName, isPaidServer, hasWhitelist }: ServerDetailProps) {
  return (
    <div className="flex items-center lg:flex-col lg:items-start gap-2">
      <span className="break-words">{serverName}</span>
      <div className="flex flex-wrap gap-1">
        {isPaidServer && <Chip className="bg-green-100 text-green-800">Paid</Chip>}
        {hasWhitelist && <Chip className="bg-amber-100 text-amber-800">Whitelist</Chip>}
      </div>
    </div>
  );
}
