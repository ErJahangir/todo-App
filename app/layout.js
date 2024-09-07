import localFont from "next/font/local";
import "./globals.css";
import StoreProvider from "./Redux/Provider";

export const metadata = {
  title: "Todo App",
  description: "This is a simple Project for Todo by redux toolkit",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
