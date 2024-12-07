import { ReplaceableLoader } from "applesauce-loaders/loaders";
import { eventStore, rxNostr } from "./core";

const replaceableLoader = new ReplaceableLoader(rxNostr, {
  bufferTime: 500,
  cacheRelays: ["ws://localhost:4869/"],
  lookupRelays: ["wss://purplepag.es/"],
});

// build loader pipeline
replaceableLoader.subscribe((packet) => {
  // add events
  eventStore.add(packet.event, packet.from);
});

export default replaceableLoader;
