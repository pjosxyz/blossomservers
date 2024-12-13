// import { TimelineQuery } from "applesauce-core/queries";
// import { useStoreQuery } from "applesauce-react/hooks";

// import Header from "@/components/layout/header";
// import { SERVER_ADVERTIZEMENT_KIND, SERVER_REVIEW_KIND } from "@/const";
// import useSubscription from "@/hooks/use-subscription";
import ServersTable from "@/components/servers-table/index";
import { serverColumns, serverData } from "@/table-configs/servers-table";

export default function HomeView() {
  // useSubscription("servers", { kinds: [SERVER_ADVERTIZEMENT_KIND] });
  // useSubscription("reviews", { kinds: [SERVER_REVIEW_KIND] });

  // const servers = useStoreQuery(TimelineQuery, [{ kinds: [SERVER_ADVERTIZEMENT_KIND] }]);

  return <ServersTable data={serverData} columns={serverColumns } />;
}

/**
 * TODO all the things:
 * - replace ServersTable...
 * - Shape the data to be passed to ServersTable
 * - Change header
 * - Import aliases
 * - Move table definition to its own component (currently doing it in App.tsx in other project)
 */
