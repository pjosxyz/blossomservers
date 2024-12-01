import iconSrc from "@/assets/icon.png";
import { HelpDialog } from "../help-dialog";
import { AddServer } from "../add-server";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex gap-2 items-center p-2 w-full">
      <img src={iconSrc} className="w-16" />
      <div>
        <h1 className="text-4xl">Blossom Servers</h1>
        <div className="flex gap-2 ">
          <Link to="/" className="hover:underline p-1">
            Servers
          </Link>
          <Link to="/reviews" className="hover:underline p-1">
            Reviews
          </Link>
        </div>
      </div>

      <div className="ms-auto flex gap-2">
        <HelpDialog />
        <AddServer />
      </div>
    </div>
  );
}