import { getTagValue } from "applesauce-core/helpers";
import { TimelineQuery } from "applesauce-core/queries";
import { useStoreQuery } from "applesauce-react/hooks";
import { useMemo } from "react";
import { SERVER_REVIEW_KIND } from "@/const";
import MobileServerRow from "@/components/servers-table/components/mobile-row";
import DesktopServerRow from "@/components/servers-table/components/desktop-row";
import { ServerRowProps } from "@/components/servers-table/types";

function ServerRow({ server, isMobile, rowBackgroundColor }: ServerRowProps) {
  console.log(server);
  const url = useMemo(() => new URL(getTagValue(server, "d")!), []);
  const reviews = useStoreQuery(TimelineQuery, [{ kinds: [SERVER_REVIEW_KIND], "#d": [url.toString()] }]);

  const average = useMemo(() => {
    if (!reviews) return 0; 

    let total = 0;
    let count = 0;

    for (const review of reviews) {
      const ratingTag = review.tags.find((t) => t[0] === "rating" && t[1] && !t[2]);
      if (ratingTag) {
        const value = parseFloat(ratingTag[1]);
        if (!Number.isFinite(value)) continue;

        count++;
        total += value;
      }
    }

    return total / count;
  }, [reviews]);

  return isMobile ? (
    <MobileServerRow
      average={average}
      rowBackgroundColor={rowBackgroundColor}
      server={server}
      url={url}
      reviews={reviews}
    />
  ) : (
    <DesktopServerRow
      average={average}
      rowBackgroundColor={rowBackgroundColor}
      server={server}
      url={url}
      reviews={reviews}
    />
  );
}

export default ServerRow;