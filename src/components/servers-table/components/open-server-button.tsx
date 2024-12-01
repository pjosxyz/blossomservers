import { Button } from "@/components/ui/button";
import { SquareArrowOutUpRight } from "lucide-react";

function OpenServerButton({ url }: { url: URL | string }) {
  return (
    <Button variant="link" onClick={() => window.open(url, "_blank")} className="self-end">
      Open <SquareArrowOutUpRight size={16} />
    </Button>
  );
}

export default OpenServerButton;