import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kridhav.demo"),
  title: "Kridhav — Slow-churned. Pure gold. | Premium A2 Desi Cow Ghee",
  description:
    "Kridhav A2 Desi Cow Ghee, bilona-churned in small batches. Slow-churned. Pure gold. Shuddh. Sunehri. Sachha.",
  openGraph: {
    title: "Kridhav — Slow-churned. Pure gold.",
    description:
      "Premium Indian ghee, bilona method. A2 Desi Cow, Buffalo, Organic Cultured & gift hampers.",
    type: "website",
    images: ["/assets/field-jar.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0F1A14",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Kridhav A2 Desi Cow Ghee",
  brand: { "@type": "Brand", name: "Kridhav" },
  description: "Slow-churned bilona A2 Desi Cow Ghee. Pure gold.",
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "INR",
    lowPrice: "449",
    highPrice: "1499",
    availability: "https://schema.org/InStock",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
