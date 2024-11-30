import { useCallback, useState } from "react";
import { Button, ButtonProps } from "./ui/button";
import { Clipboard, ClipboardCheck } from "lucide-react";

export default function CopyButton({
  data,
  ...props
}: { data: string } & Omit<ButtonProps, "children" | "onClick" | "size">) {
  const [copied, setCopied] = useState(false);

  const handleClick = useCallback(() => {
    setCopied(true);
    navigator.clipboard.writeText(data);

    setTimeout(() => setCopied(false), 1000);
  }, [data]);

  return (
    <Button onClick={handleClick} size="icon" {...props}>
      {copied ? <ClipboardCheck size="1.2rem" /> : <Clipboard size="1.2rem" />}
    </Button>
  );
}
