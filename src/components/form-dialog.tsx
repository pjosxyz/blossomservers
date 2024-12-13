import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PropsWithChildren, ReactNode } from "react";

type FormDialogProps = {
  triggerLabel: string;
  title?: string;
  description?: string;
  footer?: ReactNode;
};

export function FormDialog({ triggerLabel, title, description, footer, children }: PropsWithChildren<FormDialogProps>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-semi text-slate-800">{title}</DialogTitle>
          <DialogDescription className="text-slate-600 text-base">{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
