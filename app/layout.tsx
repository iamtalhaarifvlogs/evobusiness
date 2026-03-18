import "@/app/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

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
        <Header />

        {/* Main Content */}
        <main className="flex-grow-1 main-content">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}