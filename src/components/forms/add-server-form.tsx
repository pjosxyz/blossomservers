import { useForm } from "react-hook-form";
import { addServerFormSchema } from "./schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { rxNostr } from "@/core";
import { SERVER_ADVERTIZEMENT_KIND } from "@/const";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export default function AddServerForm() {
  const form = useForm<z.infer<typeof addServerFormSchema>>({
    resolver: zodResolver(addServerFormSchema),
    defaultValues: {
      name: "",
      domain: "",
      description: "",
      isPaid: false,
      isWhiteList: false,
    },
    mode: "onSubmit",
  });

  async function onSubmit(values: z.infer<typeof addServerFormSchema>) {
    const url = new URL("/", values.domain).toString();
    console.log(String(values.isWhiteList));

    // rxNostr.send({
    //   kind: SERVER_ADVERTIZEMENT_KIND,
    //   content: values.description,
    //   tags: [
    //     ["d", url],
    //     ["name", values.name],
    //     ["isPaid", String(values.isPaid)],
    //     ["isWhiteList", String(values.isWhiteList)],
    //   ],
    // });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 font-md">Server name</FormLabel>
              <FormControl>
                <Input placeholder="server" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="domain"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 font-md">Domain</FormLabel>
              <FormControl>
                <Input placeholder="Example: https://server.blossom.com" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 font-md">Server Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Example: https://server.blossom.com" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPaid"
          render={({ field }) => (
            <FormItem className="flex flex-col my-12">
              <div className="flex gap-2 justify-between items-center space-y-0 w-full">
                <FormLabel className="text-slate-700 font-md">This is a paid server</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value === "yes")}
                    defaultValue={field.value ? "yes" : "no"}
                    className="flex items-center gap-8"
                  >
                    <FormItem className="flex items-center space-x-1 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isWhiteList"
          render={({ field }) => (
            <FormItem className="flex flex-col my-12">
              <div className="flex gap-2 justify-between items-center space-y-0 w-full">
                <FormLabel className="text-slate-700 font-md">This server has a white list</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value === "yes")}
                    defaultValue={field.value ? "yes" : "no"}
                    className="flex items-center gap-8"
                  >
                    <FormItem className="flex items-center space-x-1 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="yes" />
                      </FormControl>
                      <FormLabel className="font-normal">Yes</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="no" />
                      </FormControl>
                      <FormLabel className="font-normal">No</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

/**
 * Checkbox 
 * 
 *  <FormField
          control={form.control}
          name="isWhiteList"
          render={({ field }) => (
            <FormItem className="flex flex-col my-12">
              <div className="flex gap-2 justify-between items-center space-y-0 w-full">
                <FormLabel>This is a paid server</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="bg-slate-100 border checked:border-none border-slate-400 size-5 rounded-md"
                  />
                </FormControl>
              </div>
              <FormDescription>Users must pay to use server</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isWhiteList"
          render={({ field }) => (
            <FormItem className="flex flex-col my-12">
              <div className="flex gap-2 justify-between items-center space-y-0 w-full">
                <FormLabel>This server has a white list</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="bg-slate-100 border checked:border-none border-slate-400 size-5 rounded-md"
                  />
                </FormControl>
              </div>
              <FormDescription>Users need to be approved before they can use the server</FormDescription>
            </FormItem>
          )}
        />
 */
