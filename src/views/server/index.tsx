import { Navigate, useParams } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { TimelineQuery } from "applesauce-core/queries";
import { useStoreQuery } from "applesauce-react/hooks";
import { getEventUID, getTagValue } from "applesauce-core/helpers";

import { SERVER_ADVERTIZEMENT_KIND, SERVER_REVIEW_KIND } from "@/const";
import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { AddReview } from "@/components/add-review";
import CopyButton from "@/components/copy-button";
import Review from "./components/review";

export default function ServerDetailsView() {
  const params = useParams();

  if (!params.server) return <Navigate to="/" />;

  const d = new URL("https://" + params.server).toString();

  // TODO: handle multiple server events
  const server = useStoreQuery(TimelineQuery, [{ "#d": [d], kinds: [SERVER_ADVERTIZEMENT_KIND] }])?.[0];
  const reviews = useStoreQuery(TimelineQuery, [{ "#d": [d], kinds: [SERVER_REVIEW_KIND] }]);

  const names = server && getTagValue(server, "name");
  const url = new URL("/", d);

  return (
    <>
      <Header />

      <div className="flex gap-2">
        <div>
          <h2 className="text-4xl">{names}</h2>
          <span className="text-gray-500 select-all">{url.toString()}</span>
        </div>
        <CopyButton data={url.toString()} variant="ghost" />
        <Button variant="outline" onClick={() => window.open(url, "_blank")} className="ms-auto">
          Open <ExternalLink size="1.2em" />
        </Button>
      </div>

      <p className="py-2">{server?.content}</p>

      <div className="flex gap-2 pt-2">
        <h3 className="text-2xl">Reviews ({reviews?.length})</h3>
        <AddReview server={url} />
      </div>

      <div className="flex flex-col gap-2">
        {reviews?.map((review) => <Review key={getEventUID(review)} review={review} />)}
      </div>
    </>
  );
}
