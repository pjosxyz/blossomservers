import Header from "@/components/layout/header";
import { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/toaster";

function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <main className="font-sans lg:mx-auto lg:px-4 xl:container max-w-6xl">
        <Header />
        {children}
        {/* <div className="mt-10 h-full flex flex-col pb-8 bg-blue-500">{children}</div> */}
      </main>
      <Toaster />
    </>
  );
}

export default Layout;
