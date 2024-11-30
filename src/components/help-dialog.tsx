import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { HelpCircle } from "lucide-react";
import { SERVER_ADVERTIZEMENT_KIND, SERVER_REVIEW_KIND } from "../const";

export function HelpDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <HelpCircle size="1.2rem" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>What is this?</DialogTitle>
        </DialogHeader>

        <p>
          Blossom Servers is an app for discovering and reviewing publish{" "}
          <a href="https://github.com/hzrd149/blossom" target="_blank" className="text-blue-500">
            Blossom
          </a>{" "}
          servers
        </p>

        <p>
          Servers are a <code>kind:{SERVER_ADVERTIZEMENT_KIND}</code> event with a "<code>d</code>" tag containing the
          server URL
        </p>
        <p>
          Reviews are a <code>kind:{SERVER_REVIEW_KIND}</code> event with a "<code>d</code>" tag containing the server
          URL and following{" "}
          <a href="https://github.com/nostr-protocol/nips/pull/879" target="_blank" className="text-blue-500">
            NIP-78 (reviews)
          </a>{" "}
          nip
        </p>

        <p>
          This app is built using{" "}
          <a href="https://penpenpng.github.io/rx-nostr/en/v3/" target="_blank" className="text-blue-500">
            rx-nostr
          </a>{" "}
          and{" "}
          <a
            href="https://hzrd149.github.io/applesauce/modules/applesauce_core.html"
            target="_blank"
            className="text-blue-500"
          >
            applesauce
          </a>
          <br />
          View the source on{" "}
          <a href="https://github.com/hzrd149/blossomservers" target="_blank" className="text-blue-500">
            GitHub
          </a>
        </p>
      </DialogContent>
    </Dialog>
  );
}
