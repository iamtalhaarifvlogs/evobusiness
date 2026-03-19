
import "@/app/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Providers from "@/app/components/providers";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { ThemeProvider } from "@/app/context/ThemeContext";

export const metadata = {
  title: "Evo Business",
  description: "EvoDynamics Vision Business Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="app-body d-flex flex-column min-vh-100">

        
        {/* THEME PROVIDER WRAPS EVERYTHING */}
        <Providers>
          
          <Header />

          {/* MAIN CONTENT */}
          <main className="flex-grow-1 main-content">
            {children}
          </main>

          <Footer />

        </Providers>

      </body>
    </html>
  );
}