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
    default: "MedsBharat - India's Trusted Online Pharmacy",
    template: "%s | MedsBharat",
  },
  description:
    "Order medicines online from India's most trusted pharmacy. Get genuine medicines delivered to your doorstep. Upload prescription, buy healthcare products, and enjoy great discounts.",
  keywords: [
    "online pharmacy India",
    "medicine delivery",
    "buy medicines online",
    "healthcare products",
    "prescription upload",
    "pharmacy India",
    "medsbharat",
    "meds bharat",
  ],
  authors: [{ name: "MedsBharat" }],
  openGraph: {
    title: "MedsBharat - India's Trusted Online Pharmacy",
    description:
      "Order medicines online from India's most trusted pharmacy. Get genuine medicines delivered to your doorstep.",
    type: "website",
    locale: "en_IN",
    siteName: "MedsBharat",
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
