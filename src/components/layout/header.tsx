import { HelpDialog } from "../help-dialog";
import { FormDialog } from "../form-dialog";
import { Link } from "react-router-dom";
import blossomLogo from "@/assets/logo.svg";
import AddServerForm from "../forms/add-server-form";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { HamIcon, Menu } from "lucide-react";

// export default function Header() {
//   return (
//     <header className="flex justify-between items-center px-2 sm:px-4 lg:px-0 py-3">
//       <img src={blossomLogo} width={180} alt="Blossom Servers Review Site" />
//       <Tabs defaultValue="servers">
//         <TabsList className="grid w-full grid-cols-2">
//           <TabsTrigger value="servers">
//             <Link to="/">Servers</Link>
//           </TabsTrigger>
//           <TabsTrigger value="reviews">
//             <Link to="/reviews">Reviews</Link>
//           </TabsTrigger>
//         </TabsList>
//         <TabsContent value="servers">{/* <ServersTable data={data} columns={columns} /> */}</TabsContent>
//         <TabsContent value="reviews">List of reviews in a table</TabsContent>
//       </Tabs>
//       <div className="flex gap-2">
//         <HelpDialog />
//         <FormDialog triggerLabel="Add server" title="Add server" description="Advertise your blossom server and stuff">
//           <AddServerForm />
//         </FormDialog>
//       </div>
//     </header>
//   );
// }

export default function Header() {
  return (
    <header>
      <nav className="flex justify-between relative items-center px-2 sm:px-4 lg:px-0 py-3">
        <span className="sr-only">Blossom Servers</span>
        <img src={blossomLogo} width={180} className="" alt="" />
        {/* desktop */}
        <div className="hidden lg:flex justify-between items-center px-2 sm:px-4 lg:px-0 py-3">
          <NavContents />
        </div>
        {/* mobile */}

        <div className="lg:hidden flex-1 flex justify-end relative z-10">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="sr-only">Blossom Servers</SheetTitle>
              <SheetDescription className="sr-only">Mobile menu</SheetDescription>
              <NavContents />
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

function NavContents() {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <div className="flex flex-col justify-between h-full gap-2 lg:gap-8 lg:flex-row">
      <div className="flex flex-col pt-12 lg:pt-0 lg:flex-row">
        <NavLink pathname={pathname} label="Servers" route="/" />
        <NavLink pathname={pathname} label="Reviews" route="/reviews" />
      </div>
      <div className="flex flex-col lg:flex-row gap-2">
        <HelpDialog />
        <FormDialog triggerLabel="Add server" title="Add server" description="Advertise your blossom server and stuff">
          <AddServerForm />
        </FormDialog>
      </div>
    </div>
  );
}

function NavLink({ pathname, route, label }: { pathname: string; route: string; label: string }) {
  return (
    <Link
      to={route}
      className={cn(pathname === route ? "text-gray-950 rounded" : " text-gray-400", "lg:px-4 py-2 transition-all ")}
    >
      {label}
    </Link>
  );
}
