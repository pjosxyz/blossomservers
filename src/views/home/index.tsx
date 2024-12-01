import { getEventUID } from "applesauce-core/helpers";
import { TimelineQuery } from "applesauce-core/queries";
import { useStoreQuery } from "applesauce-react/hooks";

import Header from "@/components/layout/header";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SERVER_ADVERTIZEMENT_KIND, SERVER_REVIEW_KIND } from "@/const";
import useSubscription from "@/hooks/use-subscription";

import ServerRow from "./components/server-row";

export default function HomeView() {
  useSubscription("servers", { kinds: [SERVER_ADVERTIZEMENT_KIND] });
  useSubscription("reviews", { kinds: [SERVER_REVIEW_KIND] });

  const servers = useStoreQuery(TimelineQuery, [{ kinds: [SERVER_ADVERTIZEMENT_KIND] }]);

  return (
    <>
      <Header />

      <Table>
        <TableCaption>A list blossom servers</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Domain</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{servers?.map((server) => <ServerRow key={getEventUID(server)} server={server} />)}</TableBody>
      </Table>
    </>
  );
}
