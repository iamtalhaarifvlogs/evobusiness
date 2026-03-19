import "@/app/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Providers from "@/app/components/providers";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import BootstrapClient from "@/app/bootstrap-client";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="app-body d-flex flex-column min-vh-100">

        <Providers>
          <BootstrapClient />

          <Header />

          <main className="flex-grow-1 main-content">
            {children}
          </main>

          <Footer />
        </Providers>

      </body>
    </html>
  );
}