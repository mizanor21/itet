import { Poppins } from "next/font/google";
import "../../app/globals.css";
import MemberPortalNav from "@/component/MemberPortal/MemberPortalNav";
import MemberProfile from "@/component/MemberPortal/MemberProfile";
import SecureRoute from "@/component/PrivateRoute/SecureRoute";
import MemberPrivateRoute from "@/component/PrivateRoute/MemberPrivateRoute";
import Footer from "@/component/Shared/Footer/Footer";

const PoppinsFont = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"]
});

export default function MembershipLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${PoppinsFont.variable} font-sans`}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, rgba(176, 114, 16, 0.10) 0.19%, rgba(255, 255, 255, 0.10) 99.81%)'
      }}>
      <SecureRoute>
        <MemberPrivateRoute>
          <MemberPortalNav />
          <div className="lg:flex justify-between mx-[5%] gap-8 my-12">
            <div className="lg:w-[30%] mb-8 lg:mb-0">
              <MemberProfile />
            </div>
            <div className="lg:w-[70%]">
              {children}
            </div>
          </div>
          <Footer />
        </MemberPrivateRoute>
      </SecureRoute>
    </div>
  );
}