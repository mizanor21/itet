import { Poppins } from "next/font/google";

import "../../../app/globals.css";


const PoppinsFont = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"]
});

export default function MembershipLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`bg-white ${PoppinsFont.variable}`}>
      {children} {/* No Navbar/Footer */}
    </div>
  );
}
