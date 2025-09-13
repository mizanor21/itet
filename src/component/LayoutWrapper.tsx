'use client';

import { usePathname } from "next/navigation";
import Navbar from "@/component/Shared/Navbar/Navbar";
import Footer from "@/component/Shared/Footer/Footer";
import { ReactNode } from "react";

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideLayoutRoutes =
    [
      "/general-membership",
      "/lifetime-membership",
      "/renew-membership",
      "/member-portal",
      "/member-portal/upcoming-events",
      "/member-portal/downloads-resources",
      "/member-portal/notifications",
      '/member-portal/membership-documents',
      '/member-portal/welfare-membership-form'
    ];

  const shouldHideLayout = hideLayoutRoutes.includes(pathname);

  return (
    <>
      {!shouldHideLayout && <Navbar />}
      {children}
      {!shouldHideLayout && <Footer />}
    </>
  );
}
