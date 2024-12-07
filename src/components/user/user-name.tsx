import { useEffect } from "react";
import { useStoreQuery } from "applesauce-react/hooks";
import { ProfileQuery } from "applesauce-core/queries";

import replaceableLoader from "../../replaceable-loader";

export default function UserName({ pubkey }: { pubkey: string }) {
  const metadata = useStoreQuery(ProfileQuery, [pubkey]);
  useEffect(() => {
    replaceableLoader.next({ kind: 0, pubkey });
  }, [pubkey]);

  return <span>{metadata?.display_name || metadata?.name || pubkey.slice(0, 8)}</span>;
}
