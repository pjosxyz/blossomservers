import { createRxNostr, nip07Signer } from "rx-nostr";
import { verifier } from "rx-nostr-crypto";
import { EventStore, QueryStore } from "applesauce-core";

export const eventStore = new EventStore();
export const queryStore = new QueryStore(eventStore);

export const rxNostr = createRxNostr({
  verifier,
  signer: nip07Signer(),
  connectionStrategy: "lazy-keep",
});

// send all events to eventStore
rxNostr.createAllEventObservable().subscribe((message) => {
  eventStore.add(message.event, message.from);
});

// set default relays
rxNostr.setDefaultRelays(["wss://nostrue.com/", "wss://relay.primal.net/", "wss://nos.lol/", "wss://relay.damus.io/"]);

if (import.meta.env.DEV) {
  // @ts-expect-error
  window.eventStore = eventStore;
  // @ts-expect-error
  window.queryStore = queryStore;
  // @ts-expect-error
  window.rxNostr = rxNostr;
}
