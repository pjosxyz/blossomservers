import { useState, useEffect } from "react";
import { MOBILE_BREAKPOINT } from "@/const";

function useCheckMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    function checkIsMobile() {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    }

    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isMobile;
}

export default useCheckMobile;
