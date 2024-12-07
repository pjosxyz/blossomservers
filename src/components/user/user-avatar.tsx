import { useEffect } from "react";
import { useStoreQuery } from "applesauce-react/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ProfileQuery } from "applesauce-core/queries";

import replaceableLoader from "../../replaceable-loader";

export default function UserAvatar({ pubkey }: { pubkey: string }) {
  const metadata = useStoreQuery(ProfileQuery, [pubkey]);
  useEffect(() => {
    replaceableLoader.next({ kind: 0, pubkey });
  }, [pubkey]);

  const name = metadata?.display_name || metadata?.name;

  return (
    <Avatar>
      <AvatarFallback>{name?.slice(0, 1) || "U"}</AvatarFallback>
      <AvatarImage
        src={metadata?.picture || metadata?.image}
        alt={metadata?.display_name || metadata?.name || pubkey.slice(0, 8)}
      />
    </Avatar>
  );
}
