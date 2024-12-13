import { HelpDialog } from "../help-dialog";
import { FormDialog } from "../form-dialog";
import { Link } from "react-router-dom";
import blossomLogo from "@/assets/logo.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddServerForm from "../forms/add-server-form";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-2 sm:px-4 lg:px-0 py-3">
      <img src={blossomLogo} width={180} alt="Blossom Servers Review Site" />
      <Tabs defaultValue="servers">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="servers">
            <Link to="/">Servers</Link>
          </TabsTrigger>
          <TabsTrigger value="reviews">
            <Link to="/reviews">Reviews</Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="servers">{/* <ServersTable data={data} columns={columns} /> */}</TabsContent>
        <TabsContent value="reviews">List of reviews in a table</TabsContent>
      </Tabs>
      <div className="flex gap-2">
        <HelpDialog />
        <FormDialog triggerLabel="Add server" title="Add server" description="Advertise your blossom server and stuff">
          <AddServerForm />
        </FormDialog>
      </div>
    </header>
  );
}
