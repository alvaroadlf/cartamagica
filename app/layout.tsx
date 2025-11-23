import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import "./globals.css";

const caveat = Caveat({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-caveat",
});

export const metadata: Metadata = {
    title: "La Carta Mágica - Escribe a Papá Noel",
    description: "Envía tu carta mágica a Papá Noel desde Pamplona",
    icons: {
        icon: [
            {
                url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎅🏼</text></svg>",
                type: "image/svg+xml",
            },
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={`${caveat.variable} font-['Caveat',_cursive]`}>
                {children}
            </body>
        </html>
    );
}
