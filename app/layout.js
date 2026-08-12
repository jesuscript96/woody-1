import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";
import "./theme-woody.css";
import "./woody-v2.css";

// 205TF Exposure — licensed brand font for Woody. Hierarchy by WIDTH, not weight.
const exposureDisplay = localFont({
  src: [
    { path: "./fonts/Exposure-90.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Exposure-90Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-woody-display",
  display: "swap",
});
const exposureBody = localFont({
  src: [
    { path: "./fonts/Exposure-40.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Exposure-40Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-woody-serif",
  display: "swap",
});
const exposureCond = localFont({
  src: [
    { path: "./fonts/Exposure-10.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Exposure-10Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-woody-cond",
  display: "swap",
});

export const metadata = {
  title: "Bar Woody — de stadsherberg van nu",
  description:
    "Woody is geen bar. Woody is een vriend die bier tapt. Zelf tappen, samen ontdekken, blijven hangen.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body
        className={`theme-woody v2 ${exposureDisplay.variable} ${exposureBody.variable} ${exposureCond.variable}`}
      >
        {children}

        {/* Guestplan reservation widget — powers every "reserveren" button:
            any link whose href contains "#gstpln_openBookingWidget" opens the
            booking popup (Guestplan binds via a document-level click listener). */}
        <Script id="guestplan-widget" strategy="afterInteractive">
          {`(function(g,s,t,p,l,n){g["_gstpln"]={};(l=s.createElement(t)),(n=s.getElementsByTagName(t)[0]);l.async=1;l.src=p;n.parentNode.insertBefore(l,n);})(window,document,"script","https://cdn.guestplan.com/widget.js");_gstpln.accessKey = "c4c9101e3851bd94b68288c6e9f962cce67c1114";`}
        </Script>
      </body>
    </html>
  );
}
