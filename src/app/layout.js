import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tasks",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="w-100">
          <nav className="flex justify-center w-100 bg-blue-300">
                     
            <Link
              className="m-1 text-white hover:text-pink-500"
              href="/"
            >
              Home
            </Link>
            <Link
              className="m-1 text-pink-500 hover:text-white"
              href="/Management"
            >
              Tasks
            </Link>
            
                
          </nav>
        </header>
        {children}
        <footer className="text-center mt-7">&copy; Tasks with Tiffany</footer>
      </body>
    </html>
  );
}
