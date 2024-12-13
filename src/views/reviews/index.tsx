import { getEventUID } from "applesauce-core/helpers";
import { TimelineQuery } from "applesauce-core/queries";
import { useStoreQuery } from "applesauce-react/hooks";

import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SERVER_REVIEW_KIND } from "@/const";
import useSubscription from "@/hooks/use-subscription";
import ReviewRow from "./components/review-row";

export default function ReviewsView() {
  const reviews = useStoreQuery(TimelineQuery, [{ kinds: [SERVER_REVIEW_KIND] }]);

  useSubscription("reviews", { kinds: [SERVER_REVIEW_KIND] });

  return (
    <>

      <Table>
        <TableCaption>Recent server reviews</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Author</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Server</TableHead>
            <TableHead>Review</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{reviews?.map((review) => <ReviewRow key={getEventUID(review)} review={review} />)}</TableBody>
      </Table>
    </>
  );
}
