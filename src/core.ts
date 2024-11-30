import { createRxNostr } from "rx-nostr";
import { verifier } from "rx-nostr-crypto";
import { nip07Signer } from "rx-nostr";
import { EventStore, QueryStore } from "applesauce-core";

export const eventStore = new EventStore();
export const queryStore = new QueryStore(eventStore);

export const rxNostr = createRxNostr({
  verifier,
  signer: nip07Signer(),
});

// send all events to eventStore
rxNostr.createAllEventObservable().subscribe((message) => {
  eventStore.add(message.event, message.from);
});

// set default relays
rxNostr.setDefaultRelays(["wss://nostrue.com", "wss://relay.primal.net"]);

if (import.meta.env.DEV) {
  // @ts-expect-error
  window.eventStore = eventStore;
  // @ts-expect-error
  window.eventStore = eventStore;
  // @ts-expect-error
  window.rxNostr = rxNostr;
}
