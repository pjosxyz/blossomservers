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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

import { rxNostr } from "../core";
import { SERVER_ADVERTIZEMENT_KIND } from "../const";
import { Textarea } from "./ui/textarea";

export function AddServer() {
  const form = useForm({
    defaultValues: {
      domain: "",
      name: "",
      description: "",
    },
    mode: "all",
  });

  const submit = form.handleSubmit(async (values) => {
    const url = new URL("/", values.domain).toString();

    rxNostr.send({
      kind: SERVER_ADVERTIZEMENT_KIND,
      content: values.description,
      tags: [
        ["d", url],
        ["name", values.name],
      ],
    });
  });

  return (
    <Dialog onOpenChange={() => form.reset()}>
      <DialogTrigger asChild>
        <Button>Add Server</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Server</DialogTitle>
          <DialogDescription>Advertize your blossom server so other users can find it</DialogDescription>
        </DialogHeader>
        <form id="add-server" className="grid gap-4" onSubmit={submit}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Server Name"
              className="col-span-3"
              {...form.register("name", { required: true })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="domain" className="text-right">
              Domain
            </Label>
            <Input
              id="domain"
              placeholder="https://cdn.exmaple.com"
              className="col-span-3"
              type="url"
              {...form.register("domain", { required: true })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Short server description" {...form.register("description")} />
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
