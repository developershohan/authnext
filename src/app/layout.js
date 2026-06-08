import Header from "@components/nav/header";
import "./globals.css";
import {Roboto} from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "Next.js App",
  description: "A simple Next.js application with a dropdown menu.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body className={`min-h-screen bg-background text-foreground antialiased ${roboto.variable}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
