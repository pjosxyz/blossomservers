import Header from "@/components/layout/header";
import { PropsWithChildren } from "react";
import { Toaster } from "@/components/ui/toaster";

function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <main className="h-[100dvh] font-sans lg:mx-auto lg:px-4 xl:container max-w-6xl">
        <Header />
        <div className="mt-10">{children}</div>
      </main>
      <Toaster />
    </>
  );
}

export default Layout;
