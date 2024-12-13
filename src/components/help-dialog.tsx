import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { HelpCircle } from "lucide-react";
import { SERVER_ADVERTIZEMENT_KIND, SERVER_REVIEW_KIND } from "../const";
import { ReactNode } from "react";

export function HelpDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full lg:size-10">
          <span className="lg:hidden">About Blossom Servers</span>
          <HelpCircle size="1.2rem" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-semi text-xl">What is this?</DialogTitle>
        </DialogHeader>

        <p>
          Blossom Servers is an app for discovering and reviewing publish{" "}
          <a
            href="https://github.com/hzrd149/blossom"
            rel="noopener noreferrer"
            target="_blank"
            className="text-blue-500"
          >
            Blossom
          </a>{" "}
          servers
        </p>

        <div className="grid lg:grid-cols-2 gap-3">
          <KindExplainer>
            <p>
              Servers are a{" "}
              <code className="font-mono bg-gray-200 px-1 py-0.5 rounded-md ">kind:{SERVER_ADVERTIZEMENT_KIND}</code>{" "}
              event with a "<code>d</code>" tag containing the server URL
            </p>
          </KindExplainer>
          <KindExplainer>
            <p>
              Reviews are a{" "}
              <code className="font-mono bg-gray-200 px-2 py-0.5  rounded-md">kind:{SERVER_REVIEW_KIND}</code> event
              with a "<code>d</code>" tag containing the server URL and following{" "}
              <a
                href="https://github.com/nostr-protocol/nips/pull/879"
                rel="noopener noreferrer"
                target="_blank"
                className="text-blue-500"
              >
                NIP-85 (reviews)
              </a>{" "}
              nip
            </p>
          </KindExplainer>
        </div>

        <footer className="flex items-center justify-between">
          <p>
            This app is built using{" "}
            <a
              href="https://penpenpng.github.io/rx-nostr/en/v3/"
              rel="noopener noreferrer"
              target="_blank"
              className="text-blue-500"
            >
              rx-nostr
            </a>{" "}
            and{" "}
            <a
              href="https://hzrd149.github.io/applesauce/modules/applesauce_core.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              applesauce
            </a>
          </p>
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://github.com/hzrd149/blossomservers"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 bg-gray-100 self-start inline-block"
            >
              View on GitHub
              <GHLogoIcon className="size-5 fill-gray-700" />
            </a>
          </Button>
        </footer>
      </DialogContent>
    </Dialog>
  );
}
function KindExplainer({ children }: { children: ReactNode }) {
  return <article className="border-gray-200 bg-gray-50 border text-gray-800 p-3 rounded-lg">{children}</article>;
}
function GHLogoIcon({ className = "" }: { className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 256 256">
      <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path>
    </svg>
  );
}
