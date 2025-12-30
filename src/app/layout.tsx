import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "MediCare Pharmacy - Online Medicine Delivery",
    template: "%s | MediCare Pharmacy",
  },
  description:
    "Order medicines online and get them delivered to your doorstep. Upload prescription, buy healthcare products, and enjoy great discounts on medicines.",
  keywords: [
    "online pharmacy",
    "medicine delivery",
    "buy medicines online",
    "healthcare products",
    "prescription upload",
    "pharmacy India",
  ],
  authors: [{ name: "MediCare Pharmacy" }],
  openGraph: {
    title: "MediCare Pharmacy - Online Medicine Delivery",
    description:
      "Order medicines online and get them delivered to your doorstep.",
    type: "website",
    locale: "en_IN",
    siteName: "MediCare Pharmacy",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-gray-50`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
