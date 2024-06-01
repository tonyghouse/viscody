import ThemeContextDefaultProvider from "@/context/ThemeContextProvider";
import "../styles/globals.css";
import type { Metadata } from "next";
import DataTypeContextProvider from "@/context/DataTypeContextProvider";
export const metadata: Metadata = {
  title: "Viscody",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeContextDefaultProvider>
      <DataTypeContextProvider>   
           <body>{children}</body>
      </DataTypeContextProvider>
      </ThemeContextDefaultProvider>
    </html>
  );
}


