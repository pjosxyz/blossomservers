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
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import Rating from "react-rating";

import { rxNostr } from "../core";
import { SERVER_REVIEW_KIND } from "../const";
import { Textarea } from "./ui/textarea";
import { NostrEvent } from "nostr-tools";
import { getTagValue } from "applesauce-core/helpers";
import { Star } from "lucide-react";

export function AddReview({ server }: { server: NostrEvent }) {
  const form = useForm({
    defaultValues: {
      content: "",
      rating: 0,
    },
    mode: "all",
  });

  const d = getTagValue(server, "d");

  const submit = form.handleSubmit(async (values) => {
    const url = new URL("/", d!).toString();

    if (values.rating === 0) {
      return alert("Select rating first");
    }

    rxNostr.send({
      kind: SERVER_REVIEW_KIND,
      content: values.content,
      tags: [
        ["d", url],
        ["rating", (values.rating / 5).toFixed(2)],
      ],
    });
  });

  form.watch("rating");

  if (!d) return null;

  return (
    <Dialog onOpenChange={() => form.reset()}>
      <DialogTrigger asChild>
        <Button variant="outline" className="self-end">Add Review</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Review</DialogTitle>
          <DialogDescription>
            Review {getTagValue(server, "name")} ({d})
          </DialogDescription>
        </DialogHeader>
        <form id="add-server" className="grid gap-4" onSubmit={submit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="domain">Rating {form.getValues("rating")}</Label>
            {/* @ts-expect-error */}
            <Rating
              initialRating={form.getValues("rating")}
              fullSymbol={<Star fill="currentColor" size="32" />}
              emptySymbol={<Star size="32" />}
              start={0}
              stop={5}
              onChange={(v) => form.setValue("rating", v, { shouldDirty: true, shouldTouch: true })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="content">Review</Label>
            <Textarea id="content" {...form.register("content", { required: true })} />
          </div>
        </form>
        <DialogFooter>
          <Button type="submit" disabled={form.formState.isSubmitting} form="add-server">
            Publish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
