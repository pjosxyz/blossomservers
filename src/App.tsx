import { useStoreQuery } from "applesauce-react/hooks";
import { TimelineQuery } from "applesauce-core/queries";

import iconSrc from "./assets/icon.png";
import { SERVER_ADVERTIZEMENT_KIND, SERVER_REVIEW_KIND } from "./const";
import useSubscription from "./hooks/use-subscription";
import { AddServer } from "./components/add-server";
import { HelpDialog } from "./components/help-dialog";
import ServersTable from "./components/servers-table";

function App() {
  useSubscription("servers", { kinds: [SERVER_ADVERTIZEMENT_KIND] });
  useSubscription("reviews", { kinds: [SERVER_REVIEW_KIND] });

  const servers = useStoreQuery(TimelineQuery, [{ kinds: [SERVER_ADVERTIZEMENT_KIND] }]);

  return (
    <>
      <header className="flex gap-2 items-center p-2 w-full">
        <img src={iconSrc} className="w-16" />
        <h1 className="text-4xl">Blossom Servers</h1>

        <div className="ms-auto flex gap-2">
          <HelpDialog />
          <AddServer />
        </div>
      </header>
      <ServersTable servers={servers} />
    </>
  );
}

export default App;
