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
      hasWhitelist: false,
    },
    mode: "all",
  });

  async function onSubmit(values: z.infer<typeof addServerFormSchema>) {
    const url = new URL("/", values.domain).toString();
    console.log(String(values.hasWhitelist));

    // rxNostr.send({
    //   kind: SERVER_ADVERTIZEMENT_KIND,
    //   content: values.description,
    //   tags: [
    //     ["d", url],
    //     ["name", values.name],
    //     ["isPaid", String(values.isPaid)],
    //     ["hasWhitelist", String(values.hasWhitelist)],
    //   ],
    // });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[1fr_2.5fr] space-y-0">
              <FormLabel className="text-gray-600 font-md">Server name</FormLabel>
              <FormControl>
                <Input placeholder="server" {...field} className="placeholder:text-300" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="domain"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[1fr_2.5fr] space-y-0">
              <FormLabel className="text-gray-600 font-md">Domain</FormLabel>
              <FormControl>
                <Input placeholder="Example: https://server.blossom.com" {...field} className="placeholder:text-300" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="grid grid-cols-[1fr_2.5fr] space-y-0">
              <FormLabel className="text-gray-600 font-md">Server Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Example: https://server.blossom.com" {...field} className="placeholder:text-300" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPaid"
          render={({ field }) => (
            <FormItem className="flex flex-col ">
              <div className="grid grid-cols-[1fr_2.5fr] space-y-0">
                <FormLabel className="text-gray-600 font-md">This is a paid server</FormLabel>
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
          name="hasWhitelist"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="grid grid-cols-[1fr_2.5fr] space-y-0">
                <FormLabel className="text-gray-600 font-md">Server has a white list</FormLabel>
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

