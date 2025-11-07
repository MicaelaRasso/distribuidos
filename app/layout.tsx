import Providers from "@/app/providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokedex",
  description: "Generated for the TP4 of Sistemas Distribuidos",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <div className="flex flex-col min-h-screen">
          {/* Navbar */}
          <nav className="bg-pink-200 text-white shadow-lg">
            <div className="max-w-4xl mx-auto px-4">
              <div className="flex items-center justify-between h-12">
                <span className="text-2xl font-bold">Pokédex</span>

                <div className="flex space-x-4">
                  <Link
                    href="/"
                    className="text-sm px-4 py-2 rounded-lg bg-pink-400 hover:bg-pink-500 transition"
                  >
                    Pokemones
                  </Link>
                  <Link
                    href="/favorites"
                    className="text-sm px-4 py-2 rounded-lg bg-pink-400 hover:bg-pink-500 transition"
                  >
                    Favoritos
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Contenido principal */}
          <Providers>{children}</Providers>


          {/* Footer */}
          <footer className="bg-violet-200 text-white py-6">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-sm">
                © 2025 Pokédex App - Desarrollado para Sistemas Distribuidos
              </p>
              <p className="text-xs text-gray-600 mt-2">
                Datos proporcionados por PokeAPI
              </p>
            </div>
          </footer>
        </div>
      </body >
    </html >
  );
}