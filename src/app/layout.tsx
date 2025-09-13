import type { Metadata } from "next";
import { Manuale, Poppins } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/component/LayoutWrapper";
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from "@/context/AuthContext";

const PoppinsFont = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"]
});

const ManualeFont = Manuale({
  variable: "--font-manuale",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "ITET Bangladesh",
  description: "ITET Bangladesh",
};





export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`bg-white ${PoppinsFont.variable} ${ManualeFont.variable}`}>
        <AuthProvider>
          <Toaster />
          <LayoutWrapper>{children}</LayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
