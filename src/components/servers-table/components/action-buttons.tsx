import { Button } from "@/components/ui/button";
import { SquareArrowOutUpRight } from "lucide-react";

export default function ActionButtons({ url }: { url: string }) {
  return (
    <>
      <Button variant="link" asChild className="cursor-pointer">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open <SquareArrowOutUpRight size={14} />
        </a>
      </Button>
      <Button variant="secondary">Add review</Button>
    </>
  );
}
