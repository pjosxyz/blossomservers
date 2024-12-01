import { PropsWithChildren } from "react";


export default function Layout({ children }: PropsWithChildren) {
  return <main className="mx-auto sm:px-4">{children}</main>;
}
